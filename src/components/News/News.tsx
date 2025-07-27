import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  title: string;
  content: string;
  category: string;
  timestamp: string;
  keywords: string[];
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/news");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    // Fetch news initially
    fetchNews();

    // Set up interval to fetch news every 10 seconds
    const intervalId = setInterval(fetchNews, 10000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  function handleGoBackHomeButton() {
    navigate("/Home");
  }

  return (
    <div>
      <h1>News</h1>
      <button onClick={handleGoBackHomeButton}>Home</button>
      <div>
        {news.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Timestamp:</strong> {item.timestamp}
            </p>
            <p>
              <strong>Keywords:</strong> {item.keywords.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
