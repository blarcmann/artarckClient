const posts = [
    { title: 'postA', body: 'postA contents and body' },
    { title: 'postB', body: 'postB and body contents'},
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback) {
    setTimeout(() => {
        console.log(posts);
        posts.push(post);
        callback();
        console.log(posts);
    }, 2000)
}

// getPosts();
createPost({ title: 'postC', body: 'postB and body contents' }, getPosts);