        //Caminho da API
        const API = 'http://localhost:3000'

        //Criação do método para gerar o botão
        const createButton = (label, type) => {
            //Abaixo a forma de se criar em Jquery um elemento dinamicamente
            return $('<button>').addClass(`btn btn-${type}`).html(label)
        }

        const renderRows = clients => {
            const rows = clients.map(client => {
                const updateButton = createButton('Atualizar', 'warning')
                //Chamando a funcão loadClient, passando o cliente como parâmetro
                updateButton.click(() => loadClient(client))

                const removeButton = createButton('Remover', 'danger')
                //Chamando a funcão removeButton, passando o cliente como parâmetro
                removeButton.click(() => removeClient(client))

                return $('<tr>')
                    .append($('<td>').append(client.name))
                    .append($('<td>').append(updateButton).append(' ').append(removeButton))
            })

            $('#clientsRows').html(rows)
        }

        const loadClient = client => {
            $('[name=id]').val(client._id)
            $('[name=name]').val(client.name)
            $('[name]').focus()
        }

        const removeClient = client => {
            $.ajax({
                method: 'DELETE',
                // Abaixo a forma padrão do REST para chamada de uma exclusão
                url: `${API}/clients/${client._id}`,
                /* Para atualizar a lista de clientes, é feita a
                chamada do método getClients() */
                success: getClients
            })
        }

        const getClients = () => {
            $.ajax({
                url: `${API}/clients`,
                success: clients => {
                    renderRows(clients)
                    $('[name]').val('')
                    $('[name]').focus()
                }
            })
        }

        const saveClient = () => {
            const _id = $('[name=id]').val()
            const name = $('[name=name]').val()
            /* Na chamada AJAX abaixo, neste mesmo método, serão efetudas duas chamadas
            será feita uma chamada POST, caso o ID não esteja preenchido, para se fazer
            uma inserção, e PUT, caso o ID esteja "setado", para se fazer uma alteração.*/
            $.ajax({
                method: _id ? 'PUT' : 'POST',
                url: `${API}/clients/${_id}`,
                data: _id ? { _id, name } : { name },
                success: getClients
            })
        }

        /* Com o código abaixo, Quando a página for carregada, será chamado
        o método getClients */
        $(() => {
            getClients()
            // Associação do botão com a função saveclient()
            // Ou seja, me dê quem tem o atributo 'save'
            $('[save]').click(saveClient)
        })