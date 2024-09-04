document.addEventListener('DOMContentLoaded', function() {
    monstrarCodigos();

    document.getElementById('btnAdicionar').addEventListener('click', adicionarCodigo);
    document.getElementById('btnBaixarJson').addEventListener('click', baixarJson);
});


function adicionarCodigo() {
    const linguagem = document.getElementById('linguagem').value.trim().toLowerCase();
    const descricao = document.getElementById('descricao').value.trim();
    const exemplo = document.getElementById('exemplo').value.trim();

    if (linguagem && descricao && exemplo) {
        const codigo = {
          linguagem: linguagem,
          descricao: descricao,
          exemplo: exemplo
        };

        let codigos = JSON.parse(localStorage.getItem('codigos')) || [];
        codigos.push(codigo);
        localStorage.setItem('codigos', JSON.stringify(codigos));

        document.getElementById('linguagem').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('exemplo').value = '';

        monstrarCodigos();
    } else {
        alert('Preencha tudo seu ARROMBADO!!')
    }
}

function monstrarCodigos() {
    const codigos = JSON.parse(localStorage.getItem('codigos')) || [];

    document.getElementById('html').innerHTML = '<h2>HTML</h2>';
    document.getElementById('css').innerHTML = '<h2>CSS</h2>';
    document.getElementById('javascript').innerHTML = '<h2>JavaScript</h2>';
    document.getElementById('python').innerHTML = '<h2>Python</h2>';

    codigos.forEach(codigo => {
        const item = document.createElement('div');
        item.className = 'codigo';
        item.innerHTML = `<pre><code>${codigo.exemplo}</code></pre><p>${codigo.descricao}</p>`;

        if (codigo.linguagem === 'html') {
            document.getElementById('html').appendChild(item);
        } else if (codigo.linguagem === 'css') {
            document.getElementById('css').appendChild(item);
        } else if (codigo.linguagem === 'javascript') {
            document.getElementById('javascript').appendChild(item);
        } else if (codigo.linguagem === 'python') {
            document.getElementById('python').appendChild(item);
        }
    });
}


function baixarJson() {
    const codigos = JSON.parse(localStorage.getItem('codigos')) || [];


    const json = JSON.stringify(codigos, null, 2);

    const blob = new Blob([json], { type: "application/json"});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "codigos.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}
