class Nodo {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Nodo(value);  //10
        if (this.root === null) {
            this.root = newNode; //30 
            return this
        } else {
            let currentNode = this.root; //el nodo actual vuelta 4 va a ser 30

            while (true) {
                if (value < currentNode.value) { // 10 < 30 bo, se va a else
                    if (!currentNode.left) {
                        currentNode.left = newNode //
                        return this
                    }
                    currentNode = currentNode.left;
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode; //38
                        return this
                    }
                    currentNode = currentNode.right
                }
            }
        }
    }

    search(value) {
        const newNode = new Nodo(value);
        if (this.root === null) {
            return null
        } else {
            let currentNode = this.root;

            while (true) {
                if (value == currentNode.value) {
                    return currentNode;

                } else if (value < currentNode.value) {
                    currentNode = currentNode.left

                    if (currentNode == value) {
                        return currentNode;
                    }
                } else if (value > currentNode.value) {
                    currentNode = currentNode.right
                    if (currentNode == value) {
                        return currentNode;
                    }
                } else {
                    return null;
                }
            }
        }

    }

    inOrder() {
        let enOrden = []; //aqui guardo todos los numeros dependiendo de como se vayan acoplando o recaudadndo

        function ordenar(hijo) { //funcion para ordenarlos
            if (hijo == null) {
                return //si sos nulo, no hagas nada y regresate para tu padre
            }

            ordenar(hijo.left) //se llama, se llama y se llama hasta que sea null.
            enOrden.push(hijo.value) //cuando es null, se regresa al ultimo valor y lo empuja
            ordenar(hijo.right)
        }

        ordenar(this.root) //el valor inicial
        return enOrden;
    }

    preOrder() {
        let enOrden = [];

        function ordenar(hijo) {
            if (hijo == null) {
                return
            }

            enOrden.push(hijo.value)
            ordenar(hijo.left)
            ordenar(hijo.right)
        }

        ordenar(this.root)
        return enOrden;
    }

    postOrder() {
        let enOrden = [];

        function ordenar(hijo) {
            if (hijo == null) {
                return
            }

            ordenar(hijo.left)
            ordenar(hijo.right)
            enOrden.push(hijo.value)
        }

        ordenar(this.root)
        return enOrden;
    }


    renderizar(nodo, valorBuscado = null) {
        if (nodo == null) {
            return '';
        }

        let color = '';

        if (valorBuscado == nodo.value) {
            color = `<div class="node-value text-light bg-danger">${nodo.value}</div>`
        } else {
            color = `<div class="node-value no-tiene">${nodo.value}</div>`
        }

        let izquierdo;

        if (nodo.left) {
            izquierdo = `<div class="tree-node left-node">${this.renderizar(nodo.left, valorBuscado)}</div>`;
        } else {
            izquierdo = `<div class="node-empty"></div>`;
        }

        let derecho;

        if (nodo.right) {
            derecho = `<div class="tree-node right-node">${this.renderizar(nodo.right, valorBuscado)}</div>`;
        } else {
            derecho = `<div class="node-empty"></div>`;
        }


        let html = `
            ${color}
            <div class="node-children">
                ${izquierdo}
                ${derecho}
            </div>`;

        return html;
    }
}


let numeroAInsertar = document.querySelector('#input-insertar')
let botonGuardar = document.querySelector('#btn-insertar')
let contenedorTree = document.querySelector('#tree-root-container')
let numeroABuscar = document.querySelector('#input-buscar')
let botonBuscar = document.querySelector('#btn-buscar')
let botonMostrarIn = document.querySelector('#btn-inorder')
let botonMostrarPre = document.querySelector('#btn-preorder')
let botonMostrarPost = document.querySelector('#btn-postorder')
let modal = document.querySelector('#modalAlerta')
let botonLimpiar = document.querySelector('#btn-eliminar')

let arbolBinario = new BinaryTree()


botonGuardar.addEventListener('click', (event) => {
    if (numeroAInsertar.value == '') {
        alert('Ingrese un valor dentro del campo')
    } else {
        arbolBinario.insert(parseInt(numeroAInsertar.value))
        contenedorTree.innerHTML = ''
        contenedorTree.innerHTML = `<div class="tree-node">${arbolBinario.renderizar(arbolBinario.root)}</div>`;

    }
})

botonBuscar.addEventListener('click', (event) => {

    if (numeroABuscar.value == '') {
        alert('Ingrese un numero dentro del campo para poder buscarlo')
    } else if (arbolBinario.inOrder().length == 0) {
        alert('No tiene numeros ingresados aun')
    } else if (arbolBinario.renderizar(arbolBinario.root, parseInt(numeroABuscar.value)).includes('no-tiene')) {
        alert('No se encontro ninguna coincidencia')
    } else {
        contenedorTree.innerHTML = ''
        contenedorTree.innerHTML = `<div class="tree-node">${arbolBinario.renderizar(arbolBinario.root, parseInt(numeroABuscar.value))}</div>`;
    }
})

botonLimpiar.addEventListener('click', (event) => {
    numeroABuscar.value = ''
    numeroAInsertar.value = ''
    contenedorTree.innerHTML = `<div class="tree-node">${arbolBinario.renderizar(arbolBinario.root)}</div>`;
})

let index = 0

botonMostrarIn.addEventListener('click', (event) => {
    if (arbolBinario.inOrder().length == 0) {
        alert('No hay valores aun')
    } else {
        index = 0
        let longitud = []
        longitud = arbolBinario.inOrder()
        mostrar(longitud)
    }
})

botonMostrarPost.addEventListener('click', (event) => {
    if (arbolBinario.postOrder().length == 0) {
        alert('No hay valores aun')
    } else {
        index = 0
        let longitud = []
        longitud = arbolBinario.postOrder()
        mostrar(longitud)
    }
})

botonMostrarPre.addEventListener('click', (event) => {
    if (arbolBinario.preOrder().length == 0) {
        alert('No hay valores aun')
    } else {
        index = 0
        let longitud = []
        longitud = arbolBinario.preOrder()
        mostrar(longitud)
    }
})


function mostrar(longitud) {

    contenedorTree.innerHTML = `<div class="tree-node">${arbolBinario.renderizar(arbolBinario.root, longitud[index])}</div>`;

    setTimeout(() => {
        if (index < longitud.length) {
            index++
            contenedorTree.innerHTML = ''
            mostrar(longitud)
        } else {
            index = 0
        }
    }, 1500)

}