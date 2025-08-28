import React, { useState, useEffect } from "react";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { formatDate } from "date-fns";
import { 
    Calendar, 
    User, 
    Tag, 
    Share2, 
    Twitter, 
    Linkedin, 
    Facebook, 
    Link as LinkIcon,
    ChevronRight,
    ChevronDown
} from "lucide-react";
import { Link } from "@inertiajs/react";
import PostCard from "./PostCard";

// Enhanced blog content styles with improved typography and H4 heading visibility
const blogContentStyles = `
    .blog-content {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        line-height: 1.7 !important;
        color: #374151 !important; /* text-gray-700 */
        font-size: 1.125rem !important; /* text-lg base */
        max-width: 100% !important;
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        font-weight: 400 !important;
    }
   
    
    /* Enhanced list styles matching the exact design guide */
    .blog-content ul, .blog-content ol {
        font-size: 1.125rem !important; /* text-lg */
        color: #374151 !important; /* text-gray-700 */
        list-style: none !important; /* remove default bullets */
        margin: 0 !important;
        padding: 0 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    
    .blog-content li {
        display: flex !important;
        align-items: flex-start !important;
        gap: 0.75rem !important; /* spacing between bullet and text */
        margin-bottom: 1rem !important; /* space-y-4 */
        font-size: 1.125rem !important; /* text-lg */
        color: #374151 !important; /* text-gray-700 */
        line-height: 1.7 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        font-weight: 400 !important;
        padding-left: 0 !important;
    }
    
    .blog-content ul li::before {
        content: '•' !important;
        color: #eab308 !important; /* text-yellow-500 */
        font-weight: bold !important;
        flex-shrink: 0 !important;
    }
    
    .blog-content ol li {
        counter-increment: list-counter !important;
        padding-left: 0 !important;
    }
    
    .blog-content ol {
        counter-reset: list-counter !important;
    }
    
    .blog-content ol li::before {
        content: counter(list-counter) '.' !important;
        color: #eab308 !important; /* text-yellow-500 */
        font-weight: 600 !important;
        margin-right: 0.75rem !important; /* mr-3 */
        flex-shrink: 0 !important;
    }
    
    /* Enhanced link styles */
    .blog-content a {
        color: #f59e0b !important;
        text-decoration: underline !important;
        text-decoration-thickness: 2px !important;
        text-underline-offset: 3px !important;
        font-weight: 700 !important;
        transition: all 0.3s ease !important;
    }
    
    .blog-content a:hover {
        color: #d97706 !important;
        text-decoration-color: #d97706 !important;
        background-color: rgba(245, 158, 11, 0.1) !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
    }
    
    /* Enhanced blockquote styles */
    .blog-content blockquote {
        border-left: 6px solid #f59e0b !important;
        padding: 1.5rem 2rem !important;
        margin: 2.5rem 0 !important;
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important;
        border-radius: 0 12px 12px 0 !important;
        font-style: italic !important;
        color: #92400e !important;
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        position: relative !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05) !important;
    }
    
    .blog-content blockquote::before {
        content: '"' !important;
        position: absolute !important;
        top: 0.5rem !important;
        left: 1rem !important;
        font-size: 3rem !important;
        color: #f59e0b !important;
        opacity: 0.3 !important;
        line-height: 1 !important;
    }
    
    /* Enhanced code styles */
    .blog-content code {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%) !important;
        padding: 0.375rem 0.75rem !important;
        border-radius: 6px !important;
        font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'SF Mono', Consolas, monospace !important;
        font-size: 0.9em !important;
        color: #dc2626 !important;
        font-weight: 600 !important;
        border: 1px solid #cbd5e1 !important;
    }
    
    /* Enhanced image styles */
    .blog-content img {
        max-width: 100% !important;
        height: auto !important;
        margin: 3rem auto !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        display: block !important;
        transition: transform 0.3s ease !important;
    }
    
    .blog-content img:hover {
        transform: scale(1.02) !important;
    }
    
    /* Enhanced table styles */
    .blog-content table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin: 3rem 0 !important;
        background: white !important;
        border-radius: 12px !important;
        overflow: hidden !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08) !important;
        border: 1px solid #e2e8f0 !important;
    }
    
    .blog-content th, .blog-content td {
        padding: 1rem 1.5rem !important;
        text-align: left !important;
        border-bottom: 1px solid #e2e8f0 !important;
        font-size: 1rem !important;
    }
    
    .blog-content th {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        font-size: 0.875rem !important;
    }
    
    .blog-content tr:hover {
        background-color: #f8fafc !important;
    }
    
    /* Content spacing and flow improvements */
    .blog-content > *:first-child {
        margin-top: 0 !important;
    }
    
    .blog-content > *:last-child {
        margin-bottom: 0 !important;
    }
    
    /* Responsive typography maintaining design consistency */
    @media (max-width: 768px) {
        .blog-content {
            font-size: 1rem !important; /* Slightly smaller on mobile */
            line-height: 1.7 !important;
        }
        
        .blog-content h4 {
            font-size: 1.75rem !important; /* text-2xl on mobile */
            margin-bottom: 1.5rem !important; /* mb-6 */
        }
        
        .blog-content p {
            font-size: 1rem !important;
            line-height: 1.7 !important;
            margin-bottom: 1.25rem !important;
        }
        
        .blog-content li {
            font-size: 1rem !important;
            line-height: 1.7 !important;
        }
        
        .blog-content blockquote {
            padding: 1rem 1.5rem !important;
            margin: 2rem 0 !important;
            font-size: 1rem !important;
        }
        
        .blog-content ul, .blog-content ol {
            margin: 1.25rem 0 !important;
        }
    }
    
    @media (max-width: 480px) {
        .blog-content h4 {
            font-size: 1.5rem !important; /* text-xl on small mobile */
        }
        
        .blog-content p {
            font-size: 0.875rem !important; /* text-sm */
        }
        
        .blog-content li {
            font-size: 0.875rem !important; /* text-sm */
        }
    }
`;

// Inject styles into document head with enhanced specificity and debugging
if (typeof document !== 'undefined') {
    const styleId = 'blog-content-styles';
    // Remove existing styles if they exist
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Create and inject new styles with higher specificity
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.type = 'text/css';
    
    // Add enhanced CSS with higher specificity
    const enhancedCSS = blogContentStyles.replace(/\.blog-content/g, 'div.blog-content');
    styleSheet.textContent = enhancedCSS;
    
    document.head.appendChild(styleSheet);
    
    // Debug logging to verify styles are applied
    console.log('🎨 Blog content styles injected successfully');
    console.log('📊 Total CSS rules:', enhancedCSS.split('{').length - 1);
}

// Article Sidebar Component
const ArticleSidebar = ({ post, tableOfContents, activeSection, setActiveSection }) => {

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            setActiveSection(sectionId);
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = post.title;
        
        switch(platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                break;
        }
    };

    return (
        <aside className="w-full">
            <div className="sticky top-24 space-y-8">
                {/* Share Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center mb-4">
                        <Share2 className="w-5 h-5 text-gray-600 mr-2" />
                        <h5 className="font-semibold text-gray-900">Share Article</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => handleShare('twitter')}
                            className="flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Twitter className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                            <Linkedin className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleShare('facebook')}
                            className="flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-blue-50 hover:text-blue-800"
                        >
                            <Facebook className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleShare('copy')}
                            className="flex items-center justify-center p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700"
                        >
                            <LinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                        <nav className="space-y-2">
                            {tableOfContents.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`flex items-center w-full text-left p-2 rounded-lg transition-all duration-200 group ${
                                        activeSection === item.id 
                                            ? 'bg-yellow-50 text-yellow-700 border-l-2 border-yellow-500'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <ChevronRight className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                                        activeSection === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
                                    }`} />
                                    <span className="text-sm font-medium">{item.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Need Career Guidance?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Connect with experienced mentors who can help guide your career transition.
                    </p>
                    <Button 
                        asChild
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        <Link href={route('mentors.all-mentors-by-tag')}>Find a Mentor</Link>
                    </Button>
                </div>
            </div>
        </aside>
    );
};

const Post = ({ post, relatedPosts = [] }) => {
    console.log('Blog Post received post:', post);
    console.log('Blog Post received post.image:', post?.image);
    console.log('Blog Post image full_path:', post?.image?.full_path);
    const [activeSection, setActiveSection] = useState('');
    const [tableOfContents, setTableOfContents] = useState([]);
    
    // Force style injection on component mount
    useEffect(() => {
        const injectStyles = () => {
            const styleId = 'blog-content-styles';
            // Remove existing styles if they exist
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Create and inject new styles with higher specificity
            const styleSheet = document.createElement('style');
            styleSheet.id = styleId;
            styleSheet.type = 'text/css';
            
            // Add enhanced CSS with higher specificity
            const enhancedCSS = blogContentStyles.replace(/\.blog-content/g, 'div.blog-content');
            styleSheet.textContent = enhancedCSS;
            
            document.head.appendChild(styleSheet);
            
            // Debug logging
            console.log('🎨 Blog styles injected on component mount');
            console.log('📝 H4 styling applied:', enhancedCSS.includes('h4'));
        };
        
        injectStyles();
        
        // Also inject on a slight delay to ensure DOM is ready
        const timeoutId = setTimeout(injectStyles, 100);
        
        return () => clearTimeout(timeoutId);
    }, []);
    // Extract headings from post content to create dynamic table of contents
    useEffect(() => {
        const extractHeadings = () => {
            // Create a temporary div to parse the HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = post.body;
            
            // Find all heading elements (h1-h6)
            const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const headings = [];
            
            headingElements.forEach((heading, index) => {
                const text = heading.textContent.trim();
                if (text) {
                    // Create a slug from the heading text
                    const id = text.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                        .replace(/\s+/g, '-') // Replace spaces with hyphens
                        .replace(/-+/g, '-') // Replace multiple hyphens with single
                        .trim();
                    
                    headings.push({
                        id: id || `heading-${index}`,
                        title: text
                    });
                }
            });
            
            setTableOfContents(headings);
            if (headings.length > 0) {
                setActiveSection(headings[0].id);
            }
        };
        
        if (post.body) {
            extractHeadings();
        }
    }, [post.body]);

    // Track scroll position to highlight active section
    useEffect(() => {
        if (tableOfContents.length === 0) return;
        
        const handleScroll = () => {
            const sections = tableOfContents.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 100; // Offset for better UX
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(tableOfContents[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tableOfContents]);
    // Function to process post content and add IDs to headings elements
    const processPostContent = (htmlContent) => {
        if (!htmlContent) return htmlContent;
        
        // Create a temporary div to parse and modify the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        // Find all heading elements (h1, h2, h3, h4, h5, h6) and convert them to match the design specification
        const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headingElements.forEach((heading, index) => {
            const text = heading.textContent.trim();
            if (text && !heading.id) {
                // Create a slug from the heading text
                const id = text.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-') // Replace multiple hyphens with single
                    .trim();
                
                heading.id = id || `heading-${index}`;
            }
            
            // Remove all inline styles from heading and its children
            heading.removeAttribute('style');
            const headingSpans = heading.querySelectorAll('span');
            headingSpans.forEach(span => {
                span.removeAttribute('style');
                // Unwrap the span and keep only the text content
                const textContent = span.textContent;
                const textNode = document.createTextNode(textContent);
                span.parentNode.replaceChild(textNode, span);
            });
            
            // Apply exact design guide styles (matching your CSS specification)
            heading.style.fontSize = '1.875rem'; // text-3xl
            heading.style.fontWeight = '700'; // font-bold
            heading.style.color = '#111827'; // text-gray-900
            heading.style.marginBottom = '2rem'; // mb-8
            heading.style.marginTop = '0';
            heading.style.padding = '0';
            heading.style.border = 'none';
            heading.style.scrollMarginTop = '120px';
            heading.style.lineHeight = '1.3'; // exact specification
            heading.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'; // exact specification
            heading.style.display = 'block';
        });
        
        // Enhance paragraph styling to match design specification exactly
        const paragraphs = tempDiv.querySelectorAll('p');
        paragraphs.forEach((p) => {
            if (p.textContent.trim()) {
                // Remove inline styles from paragraph and its children
                p.removeAttribute('style');
                const pSpans = p.querySelectorAll('span');
                pSpans.forEach(span => {
                    span.removeAttribute('style');
                    // Unwrap the span and keep only the text content
                    const textContent = span.textContent;
                    const textNode = document.createTextNode(textContent);
                    span.parentNode.replaceChild(textNode, span);
                });
                
                // Apply exact design guide styles (matching your CSS specification)
                p.style.fontSize = '1.125rem'; // text-lg
                p.style.color = '#374151'; // text-gray-700
                p.style.marginBottom = '1.5rem'; // mb-6
                p.style.marginTop = '0';
                p.style.lineHeight = '1.7'; // exact specification
                p.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'; // exact specification
                p.style.fontWeight = '400';
            }
        });
        
        // Clean up empty paragraphs and break tags
        const emptyParagraphs = tempDiv.querySelectorAll('p');
        emptyParagraphs.forEach(p => {
            if (!p.textContent.trim() || p.innerHTML === '<br>&nbsp;' || p.innerHTML === '<br>' || p.innerHTML === '&nbsp;') {
                p.remove();
            }
        });
        
        // Enhance list styling to match design specification exactly
        const lists = tempDiv.querySelectorAll('ul, ol');
        lists.forEach((list) => {
            // Remove any inline styles from the list
            list.removeAttribute('style');
            
            // Apply exact design guide styles (matching your CSS specification)
            list.style.fontSize = '1.125rem'; // text-lg
            list.style.color = '#374151'; // text-gray-700
            list.style.listStyle = 'none'; // remove default bullets
            list.style.margin = '0'; // exact specification
            list.style.padding = '0'; // exact specification
            list.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'; // exact specification
            
            const listItems = list.querySelectorAll('li');
            listItems.forEach((li) => {
                // Remove any existing bullet spans
                const existingBullets = li.querySelectorAll('.bullet, span[style*="bullet"]');
                existingBullets.forEach(bullet => bullet.remove());
                
                // Remove inline styles from list items and their children
                li.removeAttribute('style');
                const liSpans = li.querySelectorAll('span');
                liSpans.forEach(span => {
                    span.removeAttribute('style');
                    const textContent = span.textContent;
                    const textNode = document.createTextNode(textContent);
                    span.parentNode.replaceChild(textNode, span);
                });
                
                // Apply exact design guide styles (matching your CSS specification)
                li.style.display = 'flex';
                li.style.alignItems = 'flex-start';
                li.style.gap = '0.75rem'; // spacing between bullet and text
                li.style.marginBottom = '1rem'; // space-y-4
                li.style.fontSize = '1.125rem'; // text-lg
                li.style.color = '#374151'; // text-gray-700
                li.style.lineHeight = '1.7'; // exact specification
                li.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'; // exact specification
                li.style.fontWeight = '400';
                li.style.paddingLeft = '0';
            });
        });
        
        // Enhance strong text to match design specification exactly
        const strongElements = tempDiv.querySelectorAll('strong, b');
        strongElements.forEach((strong) => {
            strong.removeAttribute('style');
            const strongSpans = strong.querySelectorAll('span');
            strongSpans.forEach(span => {
                span.removeAttribute('style');
                const textContent = span.textContent;
                const textNode = document.createTextNode(textContent);
                span.parentNode.replaceChild(textNode, span);
            });
            
            // Apply exact design guide styles (matching your CSS specification)
            strong.style.fontWeight = '700'; // font-bold
            strong.style.color = '#374151'; // text-gray-700 (same as paragraph text)
            strong.style.fontSize = 'inherit';
            strong.style.fontFamily = 'inherit';
        });
        
        // Remove any remaining problematic spans with inline styles
        const allSpans = tempDiv.querySelectorAll('span');
        allSpans.forEach(span => {
            if (span.hasAttribute('style') && !span.classList.contains('bullet')) {
                span.removeAttribute('style');
                // If span is just a wrapper, unwrap it
                if (!span.className && !span.id) {
                    const textContent = span.textContent;
                    const textNode = document.createTextNode(textContent);
                    span.parentNode.replaceChild(textNode, span);
                }
            }
        });
        
        return tempDiv.innerHTML;
    };
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        src={post?.image?.full_path || "/images/welcomeBanner.webp"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                <div className="relative h-full flex items-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-block px-4 py-2 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 mb-6">
                            FOMOEDGE
                        </div>
                        <h1 className="text-5xl text-white lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 mb-8">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span className="text-sm font-medium">
                                    {formatDate(new Date(post.created_at), "MMMM yyyy")}
                                </span>
                            </div>
                            {post.categories?.[0] && (
                                <div className="flex items-center">
                                    <Tag className="w-5 h-5 mr-2" />
                                    <span className="text-sm font-medium">{post.categories[0].name}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                <span className="text-sm font-medium">Fomoedge Team</span>
                            </div>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                            {post.short_description}
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-white/60 font-medium">
                    FOMOEDGE
                </div>
            </section>

            {/* Mobile Table of Contents */}
            {tableOfContents.length > 0 && (
                <div className="lg:hidden bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                        <nav className="grid grid-cols-1 gap-2">
                            {tableOfContents.map((item) => {
                                const scrollToSection = (sectionId) => {
                                    const element = document.getElementById(sectionId);
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                            inline: 'nearest'
                                        });
                                    }
                                };
                                
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="flex items-center p-3 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <ChevronRight className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-medium">{item.title}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex gap-8">
                    {/* Sidebar for Desktop */}
                    <div className="hidden lg:block w-72 flex-shrink-0">
                        <ArticleSidebar 
                            post={post} 
                            tableOfContents={tableOfContents}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    </div>

                    {/* Main Content Area - Clean Design Without Cards */}
                    <div className="flex-1 min-w-0 max-w-4xl">
                        <main className="w-full">
                            {/* Article Content - Simple and Clean */}
                            <article className="max-w-none">
                                {/* Enhanced blog content with improved typography */}
                                <div 
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: processPostContent(post.body) }}
                                />
                            </article>
                            
                            {/* Simple CTA Section */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Still have questions?
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Our mentors are here to provide personalized guidance for your specific career situation.
                                </p>
                                <Button 
                                    asChild
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                                >
                                    <Link href={route('mentors.all-mentors-by-tag')}>
                                        Talk to a Mentor
                                    </Link>
                                </Button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />

          
        </div>
    );
};

// Related Posts Component
const RelatedPosts = ({ posts = [] }) => {
    // Mock related posts if none provided
    const mockPosts = [
        {
            id: 1,
            title: "How to Find the Right Mentor for Your Career Goals",
            short_description: "Discover the key strategies for identifying and connecting with mentors who can accelerate your professional development.",
            categories: [{ name: "Career Growth" }],
            image: { full_path: "/images/welcomeBanner.webp" },
            slug: "find-right-mentor",
            created_at: "2024-12-01"
        },
        {
            id: 2,
            title: "5 Signs It's Time for a Career Change",
            short_description: "Learn to recognize the warning signs that indicate it might be time to pivot your career path.",
            categories: [{ name: "Career Transition" }],
            image: { full_path: "/images/welcomeBanner.webp" },
            slug: "career-change-signs",
            created_at: "2024-11-28"
        },
        {
            id: 3,
            title: "Building Confidence in Your New Career",
            short_description: "Practical tips for overcoming imposter syndrome and building confidence in your new role.",
            categories: [{ name: "Professional Development" }],
            image: { full_path: "/images/welcomeBanner.webp" },
            slug: "building-confidence",
            created_at: "2024-11-25"
        }
    ];
    
    const relatedPosts = posts.length > 0 ? posts.slice(0, 3) : mockPosts;
    
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">More from Fomoedge</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((relatedPost) => (
                        <div key={relatedPost.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                            <img 
                                alt={relatedPost.title}
                                className="w-full h-48 object-cover"
                                src={relatedPost.image?.full_path || "/images/welcomeBanner.webp"}
                            />
                            <div className="p-6">
                                <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-600 bg-yellow-100 rounded-full mb-3">
                                    {relatedPost.categories?.[0]?.name || "Article"}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{relatedPost.title}</h3>
                                <p className="text-gray-600">{relatedPost.short_description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import BlankLayout from "@/Layouts/blank-layout";

Post.layout = (page) => (
    <BlankLayout
        children={page}
        title={
            page.props.post.meta_title
                ? page.props.post.meta_title
                : page.props.post.title
        }
        metaDescription={page.props.post.meta_description}
    />
);

export default Post;
