document.addEventListener('click', async (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE',
    })
}

document.addEventListener('click', async (event) => {
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const newTitle = prompt('Type new title')
        if (!newTitle) {
            return
        }
        edit(id, newTitle).then(() => {
            event.target.closest('li').querySelector('span').textContent = newTitle
        })
    }
})

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