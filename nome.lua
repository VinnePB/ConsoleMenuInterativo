-- Definindo uma função para criar classes em Lua
function Class()
    local class = {}
    class.__index = class

    function class:new(...)
        local instance = setmetatable({}, class)
        if instance.init then
            instance:init(...)
        end
        return instance
    end

    return class
end

-- Exemplo de uso
-- Criando uma classe "Pessoa" com propriedades e métodos
Pessoa = Class()

function Pessoa:init(nome, idade)
    self.nome = nome
    self.idade = idade
end

function Pessoa:dizer_oi()
    print("Oi, meu nome é " .. self.nome .. " e tenho " .. self.idade .. " anos.")
end

-- Criando uma instância da classe "Pessoa"
local pessoa1 = Pessoa:new("Carlos", 25)
pessoa1:dizer_oi()

-- Função para executar comandos interativos
function executar_comando()
    while true do
        io.write("Digite um comando Lua ou 'sair' para terminar: ")
        local input = io.read()
        if input == "sair" then break end
        local func, err = load(input)
        if func then
            func()
        else
            print("Erro: " .. err)
        end
    end
end

-- Iniciando o console interativo
print("Bem-vindo ao console Lua interativo!")
executar_comando()