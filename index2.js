function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem('communityPosts') || '[]');
  } catch (e) {
    console.error('Failed to load posts:', e);
    return [];
  }
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function createPostHTML(post) {
  return `
    <div class="post-card">
      <h3>${post.question}</h3>
      <p>${post.description}</p>
      ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
      <div class="post-actions">
        <button onclick="likePost(${post.id})">👍 <span>${post.likes}</span></button>
        <button onclick="commentPost(${post.id})">💬 <span>${post.comments}</span></button>
      </div>
    </div>
  `;
}

function loadTabContent(tab) {
  const allPosts = loadPosts();
  const posts = tab === 'activity'
    ? allPosts.filter(p => p.author === 'Wade Warren')
    : allPosts;

  const tabContent = document.getElementById('tabContent');
  if (posts.length === 0) {
    tabContent.innerHTML = `<p class="no-posts">No posts to show.</p>`;
    return;
  }

  tabContent.innerHTML = posts.map(p => createPostHTML(p)).join('');
}

function likePost(id) {
  const posts = loadPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index].likes++;
    localStorage.setItem('communityPosts', JSON.stringify(posts));
    loadTabContent(currentTab);
  }
}

var currentTab = 'home';
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab');
      loadTabContent(currentTab);
    });
  });

  loadTabContent(currentTab);
});
function deleteAllPosts() {
  if (confirm('Are you sure you want to delete all posts?')) {
    localStorage.removeItem('communityPosts');
    loadTabContent(currentTab);
  }
}