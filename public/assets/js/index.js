/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 21 2020 15:21:20 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const socketInit = () => {
    const socket = io()

    $('#form-update').on('submit', (e) => {
        e.preventDefault()

        const matchTitle = $('#matchTitle').val()
        const matchUrl = $('#matchUrl').val()

        if (matchUrl.trim().length != 0 &&
            matchTitle.trim().length != 0) {
            socket.emit('RECEIVE_NEW_DATA', {
                url: matchUrl,
                title: matchTitle
            })

            $('#matchTitle').val('')
            $('#matchUrl').val('')

            return false
        }
    })
}

socketInit()
