import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { faqs } from '../../data/faq';

const categories = ['All', 'Registration', 'Rules', 'Logistics'];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = faqs.filter(f => {
        const matchCat = activeCategory === 'All' || f.category === activeCategory;
        const matchSearch = f.question.toLowerCase().includes(search.toLowerCase()) ||
            f.answer.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <section id="faq" className="section">
            <div className="container">
                <SectionHeader
                    tag="// Got Questions?"
                    title="Frequently Asked"
                    highlight="Questions"
                    desc="Everything you need to know about NEURAX 2.0. Can't find your answer? Email us!"
                />

                {/* Search */}
                <div className="faq-search">
                    <span className="faq-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Category tabs */}
                <div className="gallery-tabs" style={{ marginBottom: '32px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`gallery-tab${activeCategory === cat ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="faq-list">
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--gray)', padding: '40px' }}>
                            No questions found. Try a different search term.
                        </div>
                    ) : (
                        filtered.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                className={`faq-item${openIndex === i ? ' open' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                                    <span>{faq.question}</span>
                                    <div className="faq-toggle">+</div>
                                </div>
                                <div className="faq-answer">
                                    <div className="faq-answer-inner">{faq.answer}</div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    style={{ textAlign: 'center', marginTop: '48px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: 'var(--gray)', marginBottom: '16px' }}>
                        Still have questions? We're here to help!
                    </p>
                    <a href="mailto:neurax@cmrcet.ac.in" className="btn-secondary">
                        📧 Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
