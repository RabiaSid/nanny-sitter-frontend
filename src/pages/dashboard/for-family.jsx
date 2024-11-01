import React from 'react'
import DashboardHeader from '@/component/layout/dashboard-header'
import Alert from '@/component/dashboard/alert'
import Hero from '@/component/dashboard/hero'
import Filter from '@/component/dashboard/filter'
import List from '@/component/dashboard/list'
import ChatBot from '../../component/dashboard/chat-bot'

export default function Forfamily() {
    return (
        <>
            <DashboardHeader />
            <Alert />
            <Hero />
            <Filter />
            <List />
            <ChatBot />
        </>
    )
}