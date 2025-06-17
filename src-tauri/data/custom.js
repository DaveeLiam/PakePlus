console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus    ',
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

// 自动更新功能
import { checkUpdate, downloadUpdate, installUpdate } from '@tauri-apps/api/updater';

async function checkForUpdates() {
  const { shouldUpdate, version, updaterMetadata } = await checkUpdate();
  if (shouldUpdate) {
    console.log(`新版本可用: ${version}`);
    try {
      await downloadUpdate(updaterMetadata);
      await installUpdate();
      console.log('更新已安装，请重启应用。');
    } catch (error) {
      console.error('更新失败:', error);
    }
  } else {
    console.log('没有可用的更新');
  }
}

// 定期检查更新
setInterval(checkForUpdates, 60 * 60 * 1000); // 每小时检查一次

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