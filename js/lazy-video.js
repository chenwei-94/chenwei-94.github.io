class LazyVideoLoader {
    constructor() {
        this.videos = document.querySelectorAll('video[data-src]');
        this.observerOptions = {
            rootMargin: '200px',  // 提前200px触发加载
            threshold: 0.01
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observeVideos();
        } else {
            this.loadAllVideos(); // 兼容不支持Observer的浏览器
        }
    }

    observeVideos() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadVideo(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.videos.forEach(video => observer.observe(video));
    }

    loadVideo(video) {
        // 加载视频源
        video.src = video.dataset.src;

        // 加载封面图
        if (video.dataset.poster) {
            video.poster = video.dataset.poster;
        }

        // 移除懒加载属性
        video.removeAttribute('data-src');
        video.removeAttribute('data-poster');

        // 处理自动播放
        if (video.autoplay) {
            video.play().catch(() => {
                video.muted = true;
                video.play();
            });
        }
    }

    loadAllVideos() {
        this.videos.forEach(video => this.loadVideo(video));
    }
}

// 初始化加载器
document.addEventListener('DOMContentLoaded', () => {
    new LazyVideoLoader();
});