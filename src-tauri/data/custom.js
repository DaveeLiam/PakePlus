// 在控制台输出构建信息
console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus    ',
    'color:orangered;font-weight:bolder'
);

// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a'); // 找到被点击元素的最近的<a>标签
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]'); // 检查是否在head中设置了base target="_blank"
    console.log('origin', origin, isBaseTargetBlank);
    if (
        (origin && origin.href && origin.target === '_blank') || // 如果被点击的<a>标签的target是_blank
        (origin && origin.href && isBaseTargetBlank) // 或者在head中设置了base target="_blank"
    ) {
        e.preventDefault(); // 阻止默认行为
        console.log('handle origin', origin);
        location.href = origin.href; // 手动设置跳转地址
    } else {
        console.log('not handle origin', origin);
    }
};

document.addEventListener('click', hookClick, { capture: true }); // 添加点击事件监听器

// 缓存用户名和密码
const cacheCredentials = () => {
    const usernameInput = document.getElementById('username'); // 获取用户名输入框
    const passwordInput = document.getElementById('password'); // 获取密码输入框
    if (usernameInput && passwordInput) {
        const username = usernameInput.value; // 获取用户名
        const password = passwordInput.value; // 获取密码
        if (username && password) {
            localStorage.setItem('cachedUsername', username); // 将用户名存储到localStorage
            localStorage.setItem('cachedPassword', password); // 将密码存储到localStorage
        }
    }
};

// 加载缓存的用户名和密码
const loadCachedCredentials = () => {
    const usernameInput = document.getElementById('username'); // 获取用户名输入框
    const passwordInput = document.getElementById('password'); // 获取密码输入框
    if (usernameInput && passwordInput) {
        const cachedUsername = localStorage.getItem('cachedUsername'); // 从localStorage获取缓存的用户名
        const cachedPassword = localStorage.getItem('cachedPassword'); // 从localStorage获取缓存的密码
        if (cachedUsername && cachedPassword) {
            usernameInput.value = cachedUsername; // 填充用户名到输入框
            passwordInput.value = cachedPassword; // 填充密码到输入框
        }
    }
};

// 页面加载时尝试加载缓存的凭证
window.addEventListener('load', loadCachedCredentials); // 添加页面加载事件监听器

// 提交表单时缓存凭证
const loginForm = document.getElementById('loginForm'); // 获取登录表单
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
        cacheCredentials(); // 缓存用户名和密码
        // 登录后跳转到指定页面
        window.location.href = 'https://w66644.fnos.net/p/folderview';
    });
}