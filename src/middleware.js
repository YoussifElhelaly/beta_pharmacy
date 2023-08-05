'use client'

import { NextResponse } from 'next/server'


export default function middleware(req) {
    let url = req.nextUrl
    let cookie = req.cookies.get('islogged')


    if (url.pathname == ("/login") && cookie?.value == "true") {
        return NextResponse.redirect(new URL('/', req.url))
    }
    if ((cookie?.value == "false") && url.pathname == ("/")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if ((cookie?.value == "false") && url.pathname == ("/sales")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if ((cookie?.value == "false") && url.pathname == ("/inventory")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if ((cookie?.value == "false") && url.pathname == ("/block")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if ((cookie?.value == "false") && url.pathname == ("/addUser")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}