console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// 本地缓存管理
const CacheManager = {
    prefix: 'pakeplus_',
    
    // 初始化缓存
    init() {
        try {
            // 检查本地存储是否可用
            const testKey = this.prefix + 'test';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.error('本地存储不可用:', e);
            return false;
        }
    },
    
    // 获取完整键名
    getFullKey(key) {
        return this.prefix + key;
    },
    
    // 存储数据到缓存
    set(key, value, expiresInSeconds = 86400) {
        try {
            const fullKey = this.getFullKey(key);
            const data = {
                value,
                expiresAt: Date.now() + (expiresInSeconds * 1000)
            };
            localStorage.setItem(fullKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('存储缓存失败:', e);
            return false;
        }
    },
    
    // 从缓存读取数据
    get(key) {
        try {
            const fullKey = this.getFullKey(key);
            const data = localStorage.getItem(fullKey);
            
            if (!data) return null;
            
            const parsed = JSON.parse(data);
            // 检查是否过期
            if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
                this.remove(key);
                return null;
            }
            
            return parsed.value;
        } catch (e) {
            console.error('读取缓存失败:', e);
            return null;
        }
    },
    
    // 从缓存删除数据
    remove(key) {
        try {
            const fullKey = this.getFullKey(key);
            localStorage.removeItem(fullKey);
            return true;
        } catch (e) {
            console.error('删除缓存失败:', e);
            return false;
        }
    },
    
    // 清除所有缓存
    clearAll() {
        try {
            const prefixLength = this.prefix.length;
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.substring(0, prefixLength) === this.prefix) {
                    localStorage.removeItem(key);
                }
            }
            return true;
        } catch (e) {
            console.error('清除缓存失败:', e);
            return false;
        }
    }
};

// 初始化缓存管理器
const isCacheAvailable = CacheManager.init();
console.log('本地缓存状态:', isCacheAvailable ? '可用' : '不可用');

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        
        // 示例：在跳转前缓存当前页面信息
        CacheManager.set('last_page', window.location.href);
        
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    
    // 示例：缓存新打开的URL
    CacheManager.set('last_opened_url', url);
    
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// 页面加载时检查缓存
document.addEventListener('DOMContentLoaded', () => {
    const lastPage = CacheManager.get('last_page');
    const lastOpenedUrl = CacheManager.get('last_opened_url');
    
    if (lastPage) {
        console.log('上次访问的页面:', lastPage);
    }
    
    if (lastOpenedUrl) {
        console.log('上次打开的链接:', lastOpenedUrl);
    }
    
    // 示例：缓存页面加载时间
    CacheManager.set('page_load_time', new Date().toISOString(), 3600);
});