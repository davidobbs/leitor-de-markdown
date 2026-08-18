// cache-bust: leitor path fix
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './index.css'

// autoUpdate: assim que uma nova versão termina de instalar em segundo plano,
// recarrega a página automaticamente — evita ficar preso numa versão antiga
// em cache (banners/botões removidos, correções de UI, etc.) sem precisar de
// hard refresh manual.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateSW(true)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/leitor">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
