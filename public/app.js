document.addEventListener('click', async (event) => {
    const id = event.target.dataset.id;
    const nodes = [...event.target.closest('li')?.children]
    const editingNodes = [...event.target.closest('li')?.querySelectorAll('.editing-mode')]


    if (event.target.dataset.type === 'remove') {
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'edit') {
        enableEditingMode(event, nodes, editingNodes)
    }

    if (event.target.dataset.type === 'save') {
        const input = event.target.closest('li').querySelector('input.editing-mode')
        const newTitle = input.value

        disableEditingMode(event, nodes, editingNodes)

        edit(id, newTitle).then(() => {
            event.target.closest('li').querySelector('span').textContent = newTitle
        })
    }

    if (event.target.dataset.type === 'cancel') {
        disableEditingMode(event, nodes, editingNodes)
    }
})




function enableEditingMode(event, nodes, editingNodes) {
    nodes.map(node => node.setAttribute('hidden', true))


    editingNodes.map(node => node.removeAttribute('hidden'))
}

function disableEditingMode(event, nodes, editingNodes) {
    nodes.map(node => node.removeAttribute('hidden'))

    editingNodes.map(node => node.setAttribute('hidden', true))
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE',
    })
}

async function edit(id, newTitle) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: newTitle,
        })
    })
}