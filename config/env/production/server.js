module.exports = ({end}) => ({
    url: env('RENDER_EXTERNAL_URL'),
    dirs: {
        public: "/data/public",
    },
});
