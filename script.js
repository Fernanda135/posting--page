const titulo = document.querySelector("#titulo");
const postagem = document.querySelector("#postagem");
const form = document.querySelector("form");
const container = document.querySelector("#container");

fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => data.slice(0, 5).forEach(post => {
    container.insertAdjacentHTML("beforeend", `
        <div class="conteudo">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </div>
    `);
}));

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (titulo.value.trim() && postagem.value.trim()) {
    const newPost = {
        title: titulo.value.trim(),
        body: postagem.value.trim()
    };

    // Renderizar no HTML
    renderPost(newPost.title, newPost.body);

    // Salvar no Local Storage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Postagem publicada com sucesso!");

    titulo.value = "";
    postagem.value = "";
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => renderPost(post.title, post.body));
});

function renderPost(title, body) {
    container.insertAdjacentHTML("afterbegin", `
        <div class="conteudo">
        <h2>${title}</h2>
        <p>${body}</p>
        </div>
    `);
}