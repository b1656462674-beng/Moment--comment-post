/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Edit3, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Smile, 
  Languages, 
  Mic, 
  ChevronDown,
  X,
  Type,
  Keyboard,
  Delete,
  CornerDownLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PostData } from './types';

const MOCK_POSTS: PostData[] = [
  {
    id: '1',
    author: {
      name: 'Beng',
      avatar: 'https://picsum.photos/seed/beng/100/100',
      vip: true,
      languages: ['CN', 'EN', 'JP', 'KR'],
      location: 'CN'
    },
    content: '17岁时，我们已经见过最后一面了',
    images: [
      'https://picsum.photos/seed/post1a/400/400',
      'https://picsum.photos/seed/post1b/400/400',
      'https://picsum.photos/seed/post1c/400/400',
      'https://picsum.photos/seed/post1d/400/400'
    ],
    tags: ['青春', '回忆'],
    likes: 6,
    comments: 2,
    time: '6分钟前'
  },
  {
    id: '2',
    author: {
      name: 'Maite',
      avatar: 'https://picsum.photos/seed/maite/100/100',
      vip: true,
      languages: ['ES', 'EN', 'KR', 'CN', 'JP'],
      location: 'MX'
    },
    content: 'I spent the whole day sleeping; my head even aches from all that sleep',
    images: [],
    tags: [],
    likes: 203,
    comments: 12,
    time: '刚刚'
  }
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  
  // Create Post States
  const [postText, setPostText] = useState('');
  const [postImages, setPostImages] = useState<string[]>([]);

  const openCommentModal = (authorName: string) => {
    setReplyTo(authorName);
    setIsModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsModalOpen(false);
    setCommentText('');
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
    setPostText('');
    setPostImages([]);
  };

  const addMockImage = () => {
    if (postImages.length < 9) {
      setPostImages([...postImages, `https://picsum.photos/seed/${Date.now()}/400/400`]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">H</div>
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="春日之约" 
              className="w-full bg-gray-100 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-700" />
          <Edit3 className="w-6 h-6 text-gray-700 cursor-pointer" onClick={openPostModal} />
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white px-4 py-2 flex items-center gap-6 text-gray-500 font-medium overflow-x-auto no-scrollbar border-b border-gray-100">
        <span className="text-gray-900 border-b-2 border-indigo-500 pb-1">最新</span>
        <span>推荐</span>
        <span>互助</span>
        <span className="flex items-center gap-1">自拍 <ChevronDown className="w-4 h-4" /></span>
        <span>附近</span>
      </nav>

      {/* Feed */}
      <main className="max-w-2xl mx-auto">
        {MOCK_POSTS.map(post => (
          <article key={post.id} className="bg-white mb-2 p-4 shadow-sm">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="relative">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {post.author.location && (
                    <span className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full p-0.5 shadow-sm">
                      {post.author.location === 'CN' ? '🇨🇳' : '🇲🇽'}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{post.author.name}</h3>
                    {post.author.vip && (
                      <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded italic font-black">VIP+</span>
                    )}
                    <span className="text-indigo-400 text-xs font-bold">✨ 22</span>
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    {post.author.languages?.map(lang => (
                      <span key={lang} className="text-[10px] text-gray-400 font-bold">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{post.time}</span>
                <MoreHorizontal className="w-5 h-5 text-gray-300" />
              </div>
            </div>

            {/* Post Content */}
            <p className="text-lg mb-3 leading-relaxed">{post.content}</p>
            
            {/* Post Images */}
            {post.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3 rounded-xl overflow-hidden">
                {post.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="post" 
                    className="w-full aspect-square object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-indigo-50 text-indigo-500 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactions */}
            <div className="flex items-center justify-between text-gray-400 border-b border-gray-50 pb-4 mb-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Languages className="w-5 h-5" />
                <Share2 className="w-5 h-5" />
              </div>
            </div>

            {/* Quick Comment Area (Image 2 Reference) */}
            <div 
              className="flex items-center gap-3 bg-gray-50 rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => openCommentModal(post.author.name)}
            >
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="me" 
                className="w-8 h-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-gray-400 text-sm">运营配置的友善评论</span>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex items-center justify-between z-10">
        <div className="flex flex-col items-center gap-1 text-indigo-500">
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1 rounded-full border-2 border-white">203</span>
          </div>
          <span className="text-[10px]">HelloTalk</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Search className="w-6 h-6" />
          <span className="text-[10px]">找语伴</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-indigo-500">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 -mt-8 border-4 border-white">
            <Bell className="w-6 h-6" />
          </div>
          <span className="text-[10px] mt-1">动态</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Mic className="w-6 h-6" />
          <span className="text-[10px]">语聊/直播</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <div className="relative">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 overflow-hidden">
              <img src="https://picsum.photos/seed/me/50/50" alt="me" referrerPolicy="no-referrer" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <span className="text-[10px]">我</span>
        </div>
      </footer>

      {/* Create Post Modal (Image 4 Reference) */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
              <X className="w-6 h-6 text-gray-800 cursor-pointer" onClick={closePostModal} />
              <h2 className="text-lg font-bold">动态</h2>
              <button 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  postText.trim() || postImages.length > 0 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}
                disabled={!postText.trim() && postImages.length === 0}
              >
                发布
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="relative min-h-[120px]">
                {/* Guide Text (Conditional) */}
                {postText === '' && (
                  <div className="absolute inset-0 text-gray-300 text-sm leading-relaxed pointer-events-none select-none">
                    <p>1. 用你的母语和学习语言发多语言动态，自我成长的同时也可以帮助其他语伴。</p>
                    <p className="mt-2">2. 配上图片、视频或语音，你的动态会更受欢迎。</p>
                    <p className="mt-2">3. 加入多个话题，让全球更多语伴看到你。</p>
                  </div>
                )}
                <textarea 
                  autoFocus
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full h-full min-h-[120px] bg-transparent focus:outline-none text-gray-800 resize-none"
                />
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2">
                {postImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={img} alt="upload" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button 
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setPostImages(prev => prev.filter((_, i) => i !== idx))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Add Image Box (Conditional) */}
                {postImages.length < 9 && (
                  <div 
                    className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={addMockImage}
                  >
                    <div className="relative w-8 h-8">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-red-400 -translate-y-1/2 rounded-full"></div>
                      <div className="absolute left-1/2 top-0 h-full w-1 bg-red-400 -translate-x-1/2 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Topic Button */}
              <div className="flex">
                <button className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span className="text-lg font-bold">#</span> 加入话题
                </button>
              </div>
            </div>

            {/* Toolbar & Keyboard */}
            <div className="bg-white border-t border-gray-50">
              {/* Post Toolbar */}
              <div className="flex items-center justify-around py-3 text-gray-600">
                <Mic className="w-6 h-6" />
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-gray-600 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                <Smile className="w-6 h-6" />
                <Languages className="w-6 h-6" />
                <div className="flex flex-col gap-0.5 items-center">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <div className="w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-600 rounded-full"></div>
                  <div className="absolute w-0.5 h-3 bg-gray-600 rounded-full"></div>
                </div>
              </div>

              {/* Simulated Keyboard */}
              <div className="bg-[#E1E4E9] p-2 select-none">
                {/* Keyboard Toolbar */}
                <div className="flex items-center justify-around py-2 mb-2 text-gray-600">
                  <Keyboard className="w-5 h-5" />
                  <Smile className="w-5 h-5" />
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center text-[10px] font-bold">:::</div>
                  <Mic className="w-5 h-5" />
                  <Type className="w-5 h-5" />
                  <ChevronDown className="w-5 h-5" />
                </div>

                {/* Keyboard Keys */}
                <div className="flex flex-col gap-3">
                  {KEYBOARD_ROWS.map((row, idx) => (
                    <div key={idx} className="flex justify-center gap-1.5">
                      {row.map(key => (
                        <div 
                          key={key} 
                          className="bg-white rounded-md h-11 flex-1 max-w-[36px] flex items-center justify-center font-medium shadow-sm active:bg-gray-200 transition-colors"
                          onClick={() => setPostText(prev => prev + key)}
                        >
                          {key}
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  {/* Bottom Row */}
                  <div className="flex justify-center gap-1.5 px-1">
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">符</span>
                    </div>
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">123</span>
                    </div>
                    <div className="bg-white rounded-md h-11 w-8 flex items-center justify-center shadow-sm text-xl">,</div>
                    <div className="bg-white rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-md h-11 w-8 flex items-center justify-center shadow-sm text-xl">.</div>
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <Delete className="w-5 h-5" onClick={() => setPostText(prev => prev.slice(0, -1))} />
                    </div>
                  </div>

                  {/* Final Row */}
                  <div className="flex justify-center gap-1.5 px-1 pb-2">
                    <div className="bg-gray-300 rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">中/英</span>
                    </div>
                    <div className="bg-indigo-500 text-white rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <CornerDownLeft className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Modal (Image 3 Reference) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={closeCommentModal}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header/Input */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="flex-1 flex items-center gap-2">
                    <input 
                      autoFocus
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 bg-transparent focus:outline-none text-gray-800"
                      placeholder="运营配置的友善评论"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <Smile className="w-6 h-6" />
                    <Languages className="w-6 h-6" />
                    <Mic className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Simulated Keyboard */}
              <div className="bg-[#E1E4E9] p-2 select-none">
                {/* Keyboard Toolbar */}
                <div className="flex items-center justify-around py-2 mb-2 text-gray-600">
                  <Keyboard className="w-5 h-5" />
                  <Smile className="w-5 h-5" />
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center text-[10px] font-bold">:::</div>
                  <Mic className="w-5 h-5" />
                  <Type className="w-5 h-5" />
                  <ChevronDown className="w-5 h-5" onClick={closeCommentModal} />
                </div>

                {/* Keyboard Keys */}
                <div className="flex flex-col gap-3">
                  {KEYBOARD_ROWS.map((row, idx) => (
                    <div key={idx} className="flex justify-center gap-1.5">
                      {row.map(key => (
                        <div 
                          key={key} 
                          className="bg-white rounded-md h-11 flex-1 max-w-[36px] flex items-center justify-center font-medium shadow-sm active:bg-gray-200 transition-colors"
                          onClick={() => setCommentText(prev => prev + key)}
                        >
                          {key}
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  {/* Bottom Row */}
                  <div className="flex justify-center gap-1.5 px-1">
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">符</span>
                    </div>
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">123</span>
                    </div>
                    <div className="bg-white rounded-md h-11 w-8 flex items-center justify-center shadow-sm text-xl">,</div>
                    <div className="bg-white rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-md h-11 w-8 flex items-center justify-center shadow-sm text-xl">.</div>
                    <div className="bg-gray-300 rounded-md h-11 w-12 flex items-center justify-center shadow-sm">
                      <Delete className="w-5 h-5" onClick={() => setCommentText(prev => prev.slice(0, -1))} />
                    </div>
                  </div>

                  {/* Final Row */}
                  <div className="flex justify-center gap-1.5 px-1 pb-2">
                    <div className="bg-gray-300 rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold">中/英</span>
                    </div>
                    <div className="bg-indigo-500 text-white rounded-md h-11 flex-1 flex items-center justify-center shadow-sm">
                      <CornerDownLeft className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
