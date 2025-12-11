import React, { useEffect, useRef, useState } from 'react';
import './Product.css';

interface ProductCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, icon, children }) => {
  return (
    <div className="product-card">
      <div className="product-icon">{icon}</div>
      <h3 className="product-card-title">{title}</h3>
      <div className="product-card-content">{children}</div>
    </div>
  );
};

const Product: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`product ${isVisible ? 'visible' : ''}`}
    >
      <div className="product-container">
        <h2 className="section-title">The Product</h2>
        
        <div className="product-grid">
          <ProductCard title="Theory: How It Works" icon="💡">
            <p className="product-description">
              This section explains how the product works from a theoretical perspective.
              The core concept leverages advanced algorithms and innovative approaches to
              solve complex challenges in space exploration and data analysis.
            </p>
            <ul className="product-features">
              <li>🔬 Advanced computational models</li>
              <li>📊 Real-time data processing</li>
              <li>🌐 Scalable architecture</li>
              <li>🔒 Secure and reliable systems</li>
            </ul>
          </ProductCard>

          <ProductCard title="Practice: Implementation" icon="⚙️">
            <p className="product-description">
              This section details the practical implementation steps and methodology
              used to bring the theoretical concepts to life in a real-world environment.
            </p>
            <ol className="implementation-steps">
              <li>
                <strong>Step 1:</strong> Initial setup and configuration of the core system
              </li>
              <li>
                <strong>Step 2:</strong> Integration with existing infrastructure and APIs
              </li>
              <li>
                <strong>Step 3:</strong> Testing and validation in simulated environments
              </li>
              <li>
                <strong>Step 4:</strong> Deployment and continuous monitoring
              </li>
            </ol>
          </ProductCard>
        </div>
      </div>
    </section>
  );
};

export default Product;
