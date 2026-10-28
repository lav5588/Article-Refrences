import './style.css'
import { data, type CategoryGroup, type ReferenceItem } from './data'
import { cn } from './utils/cn'

const app = document.querySelector<HTMLDivElement>('#app')

/**
 * Get categories sorted alphabetically by category name.
 */
function getSortedCategories(): CategoryGroup[] {
  return [...data].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' })
  )
}

// Default selected category is the alphabetically first category
const initialCategories = getSortedCategories()
let selectedCategory: string = initialCategories.length > 0 ? initialCategories[0].category : ''
let searchQuery: string = ''
let isMobileDrawerOpen: boolean = false

/**
 * Extracts a clean hostname (e.g. 'github.com', 'medium.com') from a URL.
 */
function getHostname(urlString: string): string {
  try {
    const url = new URL(urlString)
    return url.hostname.replace(/^www\./, '')
  } catch {
    return 'link'
  }
}

/**
 * Reusable renderer for the category list navigation.
 */
function renderCategoryList(sortedCategories: CategoryGroup[]): string {
  return `
    <ul class="${cn('flex flex-col gap-2 list-none m-0 p-0')}">
      ${sortedCategories
        .map((catGroup) => {
          const isActive = catGroup.category === selectedCategory
          const count = catGroup.links.length

          return `
            <li>
              <button 
                class="category-nav-btn ${cn(
                  'w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer select-none outline-none',
                  isActive
                    ? 'bg-gradient-to-r from-lime/15 to-midnight-200 border border-lime text-lime shadow-[0_0_15px_rgba(204,255,0,0.2)] font-bold'
                    : 'bg-midnight-200 border border-transparent text-slate-300 hover:bg-midnight-300 hover:border-cobalt/40 hover:text-white hover:translate-x-1'
                )}" 
                data-category="${catGroup.category}"
              >
                <span class="${cn('flex items-center gap-2.5 min-w-0')}">
                  <span class="${cn(
                    'w-1.5 h-1.5 rounded-full inline-block transition-colors shrink-0',
                    isActive ? 'bg-lime shadow-[0_0_6px_#ccff00]' : 'bg-cobalt shadow-[0_0_6px_#0047ff]'
                  )}"></span>
                  <span class="${cn('truncate')}">${catGroup.category}</span>
                </span>
                <span class="${cn(
                  'text-xs font-mono px-2 py-0.5 rounded-full transition-colors shrink-0 ml-2',
                  isActive ? 'bg-lime text-midnight font-bold' : 'bg-midnight-400 text-slate-400'
                )}">${count}</span>
              </button>
            </li>
          `
        })
        .join('')}
    </ul>
  `
}

/**
 * Main render function.
 */
function render() {
  if (!app) return

  // Manage body scroll when mobile drawer is open
  if (isMobileDrawerOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }

  const sortedCategories = getSortedCategories()

  // Ensure selectedCategory is valid
  if (!sortedCategories.some((c) => c.category === selectedCategory)) {
    selectedCategory = sortedCategories.length > 0 ? sortedCategories[0].category : ''
  }

  // Find active category group
  const activeGroup = sortedCategories.find((c) => c.category === selectedCategory)

  // Sort contents (links) alphabetically by heading (title)
  const sortedLinks: ReferenceItem[] = activeGroup
    ? [...activeGroup.links].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      )
    : []

  // Filter sorted links if there is a search query
  const query = searchQuery.trim().toLowerCase()
  const filteredLinks = sortedLinks.filter((item) => {
    if (!query) return true
    return (
      item.title.toLowerCase().includes(query) ||
      item.short_description.toLowerCase().includes(query) ||
      item.link.toLowerCase().includes(query)
    )
  })

  app.innerHTML = `
    <!-- ===================================================================
         MOBILE SLIDE-OVER DRAWER (Sidebar Drawer)
         =================================================================== -->
    <!-- Backdrop Overlay -->
    <div 
      id="drawer-backdrop" 
      class="${cn(
        'fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300',
        isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}"
      aria-hidden="true"
    ></div>

    <!-- Slide-in Sidebar Panel -->
    <aside 
      id="mobile-drawer" 
      class="${cn(
        'fixed top-0 bottom-0 left-0 w-[290px] max-w-[85vw] bg-midnight-100 border-r border-midnight-300 z-50 p-5 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.9)] lg:hidden transition-transform duration-300 ease-in-out',
        isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      )}"
      role="dialog" 
      aria-modal="true" 
      aria-label="Categories menu"
    >
      <!-- Drawer Header with Close Button -->
      <div class="${cn('flex items-center justify-between pb-3.5 mb-3.5 border-b border-midnight-300 shrink-0')}">
        <div class="${cn('flex items-center gap-2')}">
          <span class="${cn('text-xs font-bold uppercase tracking-wider text-slate-400')}">Categories</span>
          <span class="${cn('text-[11px] font-mono px-2 py-0.5 rounded-full bg-midnight-300 text-slate-400 border border-midnight-400')}">
            ${sortedCategories.length} Total
          </span>
        </div>
        <button 
          id="drawer-close-btn" 
          type="button" 
          aria-label="Close categories sidebar"
          class="${cn(
            'inline-flex items-center justify-center w-8 h-8 rounded-lg bg-midnight-200 border border-midnight-300 text-slate-300 hover:text-lime hover:border-lime transition-all duration-200 cursor-pointer'
          )}"
        >
          ✕
        </button>
      </div>

      <!-- Drawer Scrollable Categories List -->
      <div class="${cn('flex-1 overflow-y-auto pr-1')}">
        ${renderCategoryList(sortedCategories)}
      </div>

      <!-- Drawer Footer Info -->
      <div class="${cn('pt-4 mt-auto border-t border-midnight-300 text-xs text-slate-500 font-mono flex items-center justify-between shrink-0')}">
        <span>Article References</span>
        <span class="${cn('text-lime')}">Midnight Cyber</span>
      </div>
    </aside>

    <!-- ===================================================================
         MAIN CONTAINER
         =================================================================== -->
    <div class="${cn('w-full max-w-full px-4 sm:px-6 md:px-10 py-4 sm:py-7 min-h-screen')}">
      
      <!-- MOBILE TOP BAR: Hamburger Menu Button & Category Indicator -->
      <div class="${cn('flex items-center justify-between gap-3 p-3 mb-4 rounded-xl bg-midnight-100 border border-midnight-300 shadow-sm lg:hidden')}">
        <div class="${cn('flex items-center gap-2.5 min-w-0')}">
          <button 
            id="mobile-hamburger-btn" 
            type="button" 
            aria-label="Open categories sidebar"
            class="${cn(
              'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-midnight-200 border border-midnight-300 text-lime font-bold text-lg hover:border-lime hover:shadow-[0_0_10px_rgba(204,255,0,0.3)] transition-all cursor-pointer shrink-0'
            )}"
          >
            ☰
          </button>
          <div class="${cn('min-w-0')}">
            <span class="${cn('text-[10px] font-mono uppercase tracking-wider text-slate-400 block leading-tight')}">Category</span>
            <span class="${cn('text-sm font-bold text-white truncate block leading-tight')}">${selectedCategory}</span>
          </div>
        </div>

        <span class="${cn('text-xs font-mono px-2.5 py-1 rounded-full bg-lime/15 text-lime border border-lime/30 shrink-0')}">
          ${activeGroup?.links.length || 0} ${activeGroup?.links.length === 1 ? 'ref' : 'refs'}
        </span>
      </div>

      <!-- Two-Column Layout -->
      <div class="${cn('grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-6 lg:gap-8 items-start w-full')}">
        
        <!-- DESKTOP LEFT PANEL: Sticky Categories Sidebar (Always visible on desktop) -->
        <aside class="${cn('hidden lg:block lg:sticky lg:top-6 w-full')}">
          <div class="${cn('bg-midnight-100 border border-midnight-300 rounded-xl p-4 shadow-sm')}">
            <div class="${cn('flex items-center justify-between pb-3 mb-3 border-b border-midnight-300')}">
              <span class="${cn('text-xs font-bold uppercase tracking-wider text-slate-400')}">Categories</span>
              <span class="${cn('text-[11px] font-mono px-2 py-0.5 rounded-full bg-midnight-300 text-slate-400 border border-midnight-400')}">
                ${sortedCategories.length} Total
              </span>
            </div>

            ${renderCategoryList(sortedCategories)}
          </div>
        </aside>

        <!-- RIGHT PANEL: Alphabetically Ordered References -->
        <main class="${cn('flex flex-col gap-5 min-w-0 w-full')}">
          
          <!-- Category Header & Search Controls -->
          <div class="${cn('bg-midnight-100 border border-midnight-300 rounded-xl p-4 sm:p-5 shadow-sm')}">
            <div class="${cn('flex flex-wrap items-center justify-between gap-3 mb-3.5')}">
              <div>
                <h2 class="${cn('text-xl sm:text-2xl font-bold text-white tracking-tight')}">
                  ${selectedCategory || 'References'}
                </h2>
                <p class="${cn('text-xs sm:text-sm text-slate-400 mt-1')}">
                  Alphabetically sorted by heading &bull; ${filteredLinks.length} ${filteredLinks.length === 1 ? 'reference' : 'references'}
                </p>
              </div>

              ${
                searchQuery
                  ? `<button id="btn-clear-search" class="${cn('text-xs font-semibold text-lime hover:underline px-2.5 py-1 rounded transition-colors cursor-pointer')}">
                      ✕ Clear Search
                    </button>`
                  : ''
              }
            </div>

            <!-- Search Input -->
            <input 
              id="category-search-input" 
              type="search" 
              class="${cn(
                'w-full px-4 py-2.5 rounded-lg bg-midnight-200 border border-midnight-400 text-slate-100 text-sm placeholder:text-slate-500 outline-none transition-all duration-150',
                'focus:border-lime focus:ring-1 focus:ring-lime focus:shadow-[0_0_12px_rgba(204,255,0,0.2)]'
              )}" 
              placeholder="Filter references within ${selectedCategory}..." 
              value="${searchQuery}" 
              autocomplete="off"
            />
          </div>

          <!-- References Grid -->
          ${
            filteredLinks.length > 0
              ? `
              <div class="${cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full')}">
                ${filteredLinks
                  .map((item, idx) => {
                    const domain = getHostname(item.link)
                    const isEven = idx % 2 === 0

                    return `
                      <article class="${cn(
                        'group flex flex-col justify-between h-[270px] p-5 rounded-xl bg-midnight-100 border border-white/10 transition-all duration-200 overflow-hidden',
                        'hover:border-cobalt/50 hover:shadow-[0_0_20px_rgba(0,71,255,0.18)] hover:-translate-y-0.5'
                      )}">
                        <div class="${cn('flex-1 min-h-0 flex flex-col overflow-hidden')}">
                          <!-- Card Header Meta -->
                          <div class="${cn('flex items-center justify-between gap-2 mb-3 shrink-0')}">
                            <span class="${cn(
                              'inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                              isEven
                                ? 'bg-cobalt/15 text-cobalt-lighter border-cobalt/35'
                                : 'bg-lime/15 text-lime border-lime/35'
                            )}">
                              <span class="${cn(
                                'w-1.5 h-1.5 rounded-full inline-block shrink-0',
                                isEven ? 'bg-cobalt' : 'bg-lime'
                              )}"></span>
                              <span class="${cn('truncate max-w-[150px]')}">${selectedCategory}</span>
                            </span>
                            <span class="${cn('inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded shrink-0')}">
                              🌐 ${domain}
                            </span>
                          </div>

                          <!-- Title Heading (Alphabetical, clamped to 2 lines) -->
                          <h3 class="${cn('text-base font-bold text-white group-hover:text-lime transition-colors leading-snug mb-2 line-clamp-2 shrink-0')}" title="${item.title}">
                            <a 
                              href="${item.link}" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              class="${cn('text-inherit no-underline')}"
                            >
                              ${item.title}
                            </a>
                          </h3>

                          <!-- Short Description (clamped to 3 lines) -->
                          <p class="${cn('text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-2')}" title="${item.short_description}">
                            ${item.short_description}
                          </p>
                        </div>

                        <!-- Card Action Footer (Pinned cleanly at bottom) -->
                        <div class="${cn('flex items-center justify-between border-t border-midnight-300 pt-3 mt-auto shrink-0')}">
                          <span class="${cn('text-xs font-mono text-slate-500')}">
                            #${String(idx + 1).padStart(2, '0')}
                          </span>
                          <div class="${cn('flex items-center gap-2')}">
                            <button
                              type="button"
                              class="copy-link-btn ${cn(
                                'inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-midnight-400 bg-midnight-200 text-slate-300 hover:text-lime hover:border-lime transition-all cursor-pointer select-none'
                              )}"
                              data-url="${item.link}"
                              title="Copy URL to clipboard"
                            >
                              <span class="copy-icon">📋</span>
                              <span class="copy-text">Copy</span>
                            </button>
                            <a 
                              href="${item.link}" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              class="${cn(
                                'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 no-underline',
                                isEven
                                  ? 'text-cobalt-lighter border-cobalt/80 hover:bg-cobalt/15 hover:border-cobalt-light hover:shadow-[0_0_12px_rgba(0,71,255,0.35)]'
                                  : 'text-lime border-lime/80 hover:bg-lime/15 hover:border-lime-light hover:shadow-[0_0_12px_rgba(204,255,0,0.35)]'
                              )}"
                            >
                              Read &rarr;
                            </a>
                          </div>
                        </div>
                      </article>
                    `
                  })
                  .join('')}
              </div>
            `
              : `
              <!-- Empty Search State -->
              <div class="${cn('text-center py-12 px-6 bg-midnight-100 border border-dashed border-midnight-400 rounded-xl')}">
                <div class="${cn('text-3xl mb-2')}">🔍</div>
                <h3 class="${cn('text-base sm:text-lg font-bold text-white mb-1')}">No matching references found</h3>
                <p class="${cn('max-w-md mx-auto text-xs sm:text-sm text-slate-400 mb-4')}">
                  No references in <strong>${selectedCategory}</strong> match "<em>${searchQuery}</em>".
                </p>
                <button id="btn-empty-reset" class="${cn(
                  'inline-flex items-center justify-center font-bold text-xs sm:text-sm bg-lime text-midnight px-4 py-2 rounded-lg hover:bg-lime-light hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all duration-200 cursor-pointer'
                )}">
                  Clear Search
                </button>
              </div>
            `
          }
        </main>
      </div>
    </div>
  `

  bindEvents()
}

/**
 * Event bindings.
 */
function bindEvents() {
  // Mobile hamburger menu button -> Opens the slide-over sidebar drawer
  const hamburgerBtn = document.querySelector<HTMLButtonElement>('#mobile-hamburger-btn')
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      isMobileDrawerOpen = true
      render()
    })
  }

  // Mobile drawer close button (✕)
  const drawerCloseBtn = document.querySelector<HTMLButtonElement>('#drawer-close-btn')
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      isMobileDrawerOpen = false
      render()
    })
  }

  // Backdrop overlay click -> Closes the drawer
  const backdrop = document.querySelector<HTMLDivElement>('#drawer-backdrop')
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      isMobileDrawerOpen = false
      render()
    })
  }

  // Category navigation buttons (handles both desktop sidebar & mobile drawer)
  const catBtns = document.querySelectorAll<HTMLButtonElement>('.category-nav-btn')
  catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category')
      if (cat) {
        selectedCategory = cat
        searchQuery = '' // Reset search when switching categories
        isMobileDrawerOpen = false // Automatically close slide-over drawer on mobile
        render()
      }
    })
  })

  // Search input within category
  const searchInput = document.querySelector<HTMLInputElement>('#category-search-input')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value
      render()
      const reFocused = document.querySelector<HTMLInputElement>('#category-search-input')
      if (reFocused) {
        reFocused.focus()
        reFocused.setSelectionRange(searchQuery.length, searchQuery.length)
      }
    })
  }

  // Copy link to clipboard buttons
  const copyBtns = document.querySelectorAll<HTMLButtonElement>('.copy-link-btn')
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const url = btn.getAttribute('data-url')
      if (url) {
        try {
          await navigator.clipboard.writeText(url)
          const textSpan = btn.querySelector('.copy-text')
          const iconSpan = btn.querySelector('.copy-icon')
          if (textSpan && iconSpan) {
            textSpan.textContent = 'Copied!'
            iconSpan.textContent = '✓'
            btn.classList.add('border-lime', 'text-lime')
            setTimeout(() => {
              textSpan.textContent = 'Copy'
              iconSpan.textContent = '📋'
              btn.classList.remove('border-lime', 'text-lime')
            }, 2000)
          }
        } catch {
          window.prompt('Copy URL to clipboard:', url)
        }
      }
    })
  })

  // Clear search buttons
  const clearSearchBtn = document.querySelector<HTMLButtonElement>('#btn-clear-search')
  const emptyResetBtn = document.querySelector<HTMLButtonElement>('#btn-empty-reset')

  const clearAction = () => {
    searchQuery = ''
    render()
  }

  if (clearSearchBtn) clearSearchBtn.addEventListener('click', clearAction)
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', clearAction)
}

// Global escape key listener to close mobile drawer
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobileDrawerOpen) {
    isMobileDrawerOpen = false
    render()
  }
})

// Initial render
render()
