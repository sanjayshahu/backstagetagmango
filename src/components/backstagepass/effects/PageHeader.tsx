'use client'

import React, { JSX } from 'react'

/* -------------------------------------------------------------------------- */
/*                              Types                                          */
/* -------------------------------------------------------------------------- */

type OverlayProps = {
  darkMode?: boolean
  title: string
  description?: string
}

type PageHeaderProps = {
  title: string
  description?: string
  darkMode?: boolean
}

type IconProps = {
  className?: string
  color?: string
}

type AvatarProps = {
  className?: string
}

type TextProps = {
  text?: string
  className?: string
}

type CreatePostMediaProps = {
  media: 'photo' | 'video' | 'emoji'
  className?: string
}

/* -------------------------------------------------------------------------- */
/*                              Child Components                               */
/* -------------------------------------------------------------------------- */

const X = ({ className, color = 'currentColor' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const Play = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const Avatar = ({ className }: AvatarProps) => (
  <div
    className={`w-16 h-16 rounded-full bg-gray-300 bg-cover bg-center ${className}`}
    style={{ backgroundImage: 'url(/avatar.png)' }}
  />
)

const Text = ({ text, className }: TextProps) => <p className={className}>{text}</p>

const CreatePostMedia = ({ media, className }: CreatePostMediaProps) => {
  const label = media === 'photo' ? '📷' : media === 'video' ? '🎥' : '😊'
  return (
    <button
      type="button"
      className={`w-12 h-12 rounded-full border flex items-center justify-center hover:bg-neutral-100 ${className}`}
    >
      {label}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*                              PageHeader Component                            */
/* -------------------------------------------------------------------------- */

const PageHeader = ({ title, description, darkMode = false }: PageHeaderProps) => (
  <div className="mb-6">
    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{title}</h1>
    {description && <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{description}</p>}
  </div>
)

/* -------------------------------------------------------------------------- */
/*                                Overlay Component                             */
/* -------------------------------------------------------------------------- */

const Overlay = ({ darkMode = false, title, description }: OverlayProps): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-screen h-screen items-center justify-center ${
        darkMode ? 'bg-black/70' : 'bg-black/50'
      }`}
    >
      <div
        className={`relative flex flex-col w-[600px] rounded-3xl overflow-hidden ${
          darkMode ? 'bg-neutral-900 text-white' : 'bg-white'
        }`}
      >
        {/* Header BG */}
        <div
          className={`absolute top-0 left-0 w-full h-[180px] ${
            darkMode ? 'bg-gradient-to-b from-purple-900 to-neutral-900' : 'bg-gradient-to-b from-purple-100 to-white'
          }`}
        />

        {/* Close Button */}
        <button
          className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full ${
            darkMode ? 'bg-neutral-800' : 'bg-purple-100'
          }`}
        >
          <X className="w-6 h-6" color={darkMode ? '#fff' : '#211F26'} />
        </button>

        {/* Content */}
        <div className="relative flex flex-col gap-8 p-12">
          {/* Header */}
          <PageHeader title={title} description={description} darkMode={darkMode} />

          {/* Avatar & Name */}
          <div className="flex flex-col gap-4">
            <Avatar className="shadow-lg" />
            <Text
              text="Ashraf Idrishi"
              className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}
            />
          </div>

          {/* Post Text */}
          <Text
            text="Another day, another challenge workout checked off."
            className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}
          />

          {/* Media Preview */}
          <div className="relative h-[360px] rounded-2xl bg-black/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-12 pb-12">
          <div className="flex gap-2">
            <CreatePostMedia media="photo" />
            <CreatePostMedia media="video" />
            <CreatePostMedia media="emoji" />
          </div>

          <button className="h-12 px-6 rounded-full bg-yellow-600 text-white font-medium">
            Submit Checkin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
