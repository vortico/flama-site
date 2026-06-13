'use client'

import React from 'react'

import { IconMessageChatbot } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'

import HomeSection from './HomeSection'

export default function Chatbot() {
  return (
    <HomeSection
      id="chatbot"
      icon={<IconMessageChatbot className="h-full w-full" />}
      title="Chatbot Out of the Box"
      docRef="/docs/generative-ai/chatbot-application/"
      body={
        <>
          <p>
            Every model you serve with the native dialect comes with a polished chat interface for free, served straight
            from your application at <code>/chat/</code>. No frontend code, no build step.
          </p>
          <br />
          <p>
            Responses stream in token by token and render as Markdown, with LaTeX maths and Mermaid diagrams. Built with{' '}
            <FlamaName /> and shipped as a single self-contained page, it is the fastest way to put a model in front of
            real users.
          </p>
        </>
      }
    >
      <motion.div
        initial={{ y: '250px' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="mx-auto -mt-16 w-full max-w-4xl"
      >
        <Window title="Chatbot">
          <div className="dark:opacity-80">
            <video src="/images/home/chatbot-demo.webm" autoPlay muted loop playsInline width="920" />
          </div>
        </Window>
      </motion.div>
    </HomeSection>
  )
}
