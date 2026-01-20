import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Newsapp.css' // Assuming you have or will create this CSS file

const Newsapp = () => {
    const [search, setSearch] = useState("Pakistan");
    const [newsData, setNewsData] = useState(null)
    const [activeCategory, setActiveCategory] = useState("home")
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    const getData = async() =>{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        let dt = jsonData.articles.slice(0,10)
        setNewsData(dt)
    }

    useEffect(()=>{
        getData()
    },[])

    const handleInput = (e) =>{
        console.log(e.target.value);
        setSearch(e.target.value)
    }
    
    const userInput = (event) =>{
        const value = event.target.value;
        setSearch(value)
        setActiveCategory(value)
        getData()
    }

    // Store/home page sections data
    const storeFeatures = [
        {
            title: "Premium Subscription",
            description: "Get ad-free experience & exclusive content",
            price: "$9.99/month",
            icon: "👑"
        },
        {
            title: "Daily Digest",
            description: "Personalized news delivered daily",
            price: "Free",
            icon: "📧"
        },
        {
            title: "Archive Access",
            description: "Access 10+ years of news archives",
            price: "$4.99/month",
            icon: "📚"
        },
        {
            title: "Audio News",
            description: "Listen to news on the go",
            price: "$2.99/month",
            icon: "🎧"
        }
    ]

    const homePageStats = {
        totalArticles: "50,000+",
        liveSources: "100+",
        countries: "50+",
        updateFrequency: "Every 5 minutes"
    }

  return (
    <div className="newsapp-container">
        {/* Header/Navigation */}
        <nav className="nav-container">
            <div className="logo-section">
                <h1 className="logo">📰 SOHAIL News</h1>
                <p className="tagline">Your Daily News Companion</p>
            </div>
            
            <div className="nav-links">
                <ul>
                    <li 
                        className={activeCategory === "home" ? "active" : ""}
                        onClick={() => {setSearch("world"); setActiveCategory("home"); getData()}}
                    >
                        🏠 Home
                    </li>
                    <li 
                        className={activeCategory === "subscription" ? "active" : ""}
                        onClick={() => setActiveCategory("subscription")}
                    >
                        💰 Store
                    </li>
                    <li 
                        className={activeCategory === "trending" ? "active" : ""}
                        onClick={() => {setSearch("trending"); setActiveCategory("trending"); getData()}}
                    >
                        🔥 Trending
                    </li>
                    <li 
                        className={activeCategory === "saved" ? "active" : ""}
                        onClick={() => setActiveCategory("saved")}
                    >
                        ⭐ Saved
                    </li>
                </ul>
            </div>

            <div className='searchBar'>
                <input 
                    type='text' 
                    placeholder='🔍 Search News...' 
                    value={search} 
                    onChange={handleInput}
                    onKeyPress={(e) => e.key === 'Enter' && getData()}
                />
                <button onClick={getData} className="search-btn">Search</button>
            </div>

            <div className="user-actions">
                <button className="subscribe-btn">Subscribe Now</button>
                <div className="user-profile">👤</div>
            </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-section">
            <div className="hero-content">
                <h2 className='headline'>Stay Updated with TrendyNews</h2>
                <p className="sub-headline">Real-time news from across the globe. Trusted by millions.</p>
                
                {/* Stats Section */}
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">{homePageStats.totalArticles}</span>
                        <span className="stat-label">Articles</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{homePageStats.liveSources}</span>
                        <span className="stat-label">Live Sources</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{homePageStats.countries}</span>
                        <span className="stat-label">Countries</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{homePageStats.updateFrequency}</span>
                        <span className="stat-label">Updates</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
            {/* Store/Home Page Section (Conditional) */}
            {activeCategory === "subscription" ? (
                <div className="store-section">
                    <h2 className="store-title">🌟 Premium Features Store</h2>
                    <p className="store-description">Upgrade your news experience with our premium offerings</p>
                    
                    <div className="features-grid">
                        {storeFeatures.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <div className="price-tag">{feature.price}</div>
                                <button className="buy-btn">Add to Cart</button>
                            </div>
                        ))}
                    </div>

                    <div className="current-plan">
                        <h3>Your Current Plan: <span className="plan-name">Basic (Free)</span></h3>
                        <button className="upgrade-btn">🔄 Upgrade Plan</button>
                    </div>
                </div>
            ) : (
                /* News Section (Default) */
                <div className="news-section">
                    {/* Category Buttons */}
                    <div className='categoryBtn'>
                        <button 
                            onClick={userInput} 
                            value="sports"
                            className={activeCategory === "sports" ? "active" : ""}
                        >
                            ⚽ Sports
                        </button>
                        <button 
                            onClick={userInput} 
                            value="politics"
                            className={activeCategory === "politics" ? "active" : ""}
                        >
                            🏛️ Politics
                        </button>
                        <button 
                            onClick={userInput} 
                            value="entertainment"
                            className={activeCategory === "entertainment" ? "active" : ""}
                        >
                            🎬 Entertainment
                        </button>
                        <button 
                            onClick={userInput} 
                            value="health"
                            className={activeCategory === "health" ? "active" : ""}
                        >
                            🏥 Health
                        </button>
                        <button 
                            onClick={userInput} 
                            value="technology"
                            className={activeCategory === "technology" ? "active" : ""}
                        >
                            💻 Technology
                        </button>
                        <button 
                            onClick={userInput} 
                            value="business"
                            className={activeCategory === "business" ? "active" : ""}
                        >
                            💼 Business
                        </button>
                    </div>

                    {/* Current Category Display */}
                    <div className="category-header">
                        <h2>
                            {activeCategory === "home" ? "📰 Top Headlines" : 
                             activeCategory === "trending" ? "🔥 Trending Now" : 
                             `📁 ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`}
                        </h2>
                        <p>Showing results for: <span className="search-term">{search}</span></p>
                    </div>

                    {/* News Cards */}
                    <div className="news-container">
                        {newsData ? <Card data={newsData}/> : (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading news articles...</p>
                            </div>
                        )}
                    </div>

                    {/* Home Page Extra Content */}
                    {activeCategory === "home" && (
                        <div className="home-extras">
                            <div className="extra-card">
                                <h3>📊 Daily Briefing</h3>
                                <p>Get your personalized morning news digest</p>
                                <button className="cta-btn">Setup Daily Brief</button>
                            </div>
                            <div className="extra-card">
                                <h3>🔔 Breaking News Alerts</h3>
                                <p>Never miss important updates</p>
                                <button className="cta-btn">Enable Alerts</button>
                            </div>
                            <div className="extra-card">
                                <h3>💾 Save for Later</h3>
                                <p>Bookmark articles to read offline</p>
                                <button className="cta-btn">View Saved</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Footer */}
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Trendy News</h4>
                    <p>Your trusted source for global news since 2024</p>
                </div>
                <div className="footer-section">
                    <h4>Store</h4>
                    <a href="#">Subscriptions</a>
                    <a href="#">Gift Cards</a>
                    <a href="#">Premium Features</a>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <p>📞 +1 (800) NEWS-123</p>
                    <p>✉️ support@trendynews.com</p>
                    <p>📍 123 Media Street, Digital City</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Trendy News. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </footer>
    </div>
  )
}

export default Newsapp