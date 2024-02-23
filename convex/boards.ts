import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

import { getAllOrThrow } from 'convex-helpers/server/relationships';
import { remove } from './board';
import { auth } from '@clerk/nextjs';

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error('Unauthorized');
        }
        /**
         * @findFavoriteBoards
         */
        if (args.favorites) {
            const favoriteBoards = await ctx.db
                .query('userFavorites')
                .withIndex('by_user_org', (q) =>
                    q.eq('userId', identity.subject).eq('orgId', args.orgId)
                )
                .order('desc')
                .collect();

            const ids = favoriteBoards.map((f) => f.boardId);
            const boards = await getAllOrThrow(ctx.db, ids);
            return boards.map((b) => ({
                ...b,
                isFavorite: true,
            }));
        }

        let boards = [];
        const title = args.search as string;

        if (title) {
            /**@searchInput */
            boards = await ctx.db
                .query('boards')
                .withSearchIndex('search_title', (q) =>
                    q.search('title', title).eq('orgId', args.orgId)
                )
                .collect();
        } else {
            boards = await ctx.db
                .query('boards')
                .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
                .order('desc')
                .collect();
        }

        const boardsWithFavoriteRelation = boards.map((bo) => {
            return ctx.db
                .query('userFavorites')
                .withIndex('by_user_board', (q) =>
                    q.eq('userId', identity.subject).eq('boardId', bo._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...bo,
                        isFavorite: !!favorite,
                    };
                });
        });
        const boardsWithFavoriteBoolean = Promise.all(
            boardsWithFavoriteRelation
        );

        return boardsWithFavoriteBoolean;
    },
});

export const allDelete = mutation({
    args: { orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        }

        const boards = await ctx.db
            .query('boards')
            .filter((q) => q.eq(q.field('orgId'), args.orgId))
            .collect();

        if (!boards) {
            throw new Error('No boards found');
        }

        for (const board of boards) {
            await remove(ctx, { id: board._id });
        }
    },
});
