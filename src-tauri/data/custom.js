console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus  ',
    'color:orangered;font-weight:bolder'
);

// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a');
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    console.log('origin', origin, isBaseTargetBlank);
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault();
        console.log('handle origin', origin);
        location.href = origin.href;
    } else {
        console.log('not handle origin', origin);
    }
};

document.addEventListener('click', hookClick, { capture: true });

// 缓存策略 - 缓存用户名和密码
const cacheCredentials = () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput && passwordInput) {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username && password) {
            localStorage.setItem('cachedUsername', username);
            localStorage.setItem('cachedPassword', password);
        }
    }
};

// 加载缓存的用户名和密码
const loadCachedCredentials = () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput && passwordInput) {
        const cachedUsername = localStorage.getItem('cachedUsername');
        const cachedPassword = localStorage.getItem('cachedPassword');
        if (cachedUsername && cachedPassword) {
            usernameInput.value = cachedUsername;
            passwordInput.value = cachedPassword;
        }
    }
};

// 页面加载时尝试加载缓存的凭证
window.addEventListener('load', loadCachedCredentials);

// 提交表单时缓存凭证
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        cacheCredentials();
        // 这里可以添加登录逻辑，如发送请求到服务器等
    });
}