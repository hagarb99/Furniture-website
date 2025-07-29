// عرض اسم الملف بعد الاختيار
var imageInput = document.getElementById('imageInput');
var fileLabel = document.getElementById('fileLabel');

if (imageInput) {
  imageInput.addEventListener('change', () => {
    fileLabel.textContent = imageInput.files[0]?.name || 'Choose File';
  });
}

// إرسال السؤال وتخزينه
function submitQuestion() {
  const question = document.getElementById('question').value.trim();
  const description = document.getElementById('description').value.trim();
  const imageFile = imageInput.files[0];

  if (!question || !description) {
    alert('Please fill in all fields.');
    return;
  }

  var post = {
    id: Date.now(),
    question,
    description,
    author: 'Wade Warren',
    likes: 0,
    comments: 0,
    image: null
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      post.image = reader.result;
      savePost(post);
    };
    reader.readAsDataURL(imageFile);
  } else {
    savePost(post);
  }
}

// حفظ السؤال في localStorage
function savePost(post) {
  var posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
  posts.unshift(post);
  localStorage.setItem('communityPosts', JSON.stringify(posts));
  alert('Question posted successfully!');
  clearForm();
  window.location.href = 'index.html';
}

// مسح الفورم
function clearForm() {
  document.getElementById('question').value = '';
  document.getElementById('description').value = '';
  imageInput.value = '';
  fileLabel.textContent = 'Choose File';
}
