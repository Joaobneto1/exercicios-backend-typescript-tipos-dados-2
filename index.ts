const fs = require('fs');

const leituraArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escritaArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = leituraArquivo() as Usuario[];
    bd.push(dados);
    escritaArquivo(bd);
    return dados;
}

const listarUsuario = (filtro?: string): Usuario[] => {
    const bd = leituraArquivo() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro;
        }

        return usuario;
    })

    return usuarios;
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = leituraArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuario nao encontrado');
    }

    return usuario
}

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
    const bd = leituraArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuario nao encontrado');
    }

    Object.assign(usuario, dados);

    escritaArquivo(bd);

    return dados;

}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = leituraArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuario nao encontrado');
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf
    });

    escritaArquivo(exclusao)

    return usuario;
}

const bd = listarUsuario('fullstack');
console.log(bd);

