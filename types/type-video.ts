export interface YoutubeSearchResponse {
    id: {
        videoId: string;
        channelId: string;
    };
    snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
        channelTitle: string;
    };
}
