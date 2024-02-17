import { v } from 'convex/values';
import { query } from './_generated/server';

import { getAllOrThrow } from 'convex-helpers/server/relationships';

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
