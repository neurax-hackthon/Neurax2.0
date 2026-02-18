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
        <section id="faq" className="section alt">
            <div className="container">
                <SectionHeader
                    tag="// Got Questions?"
                    title="Frequently Asked"
                    highlight="Questions"
                    desc="Everything you need to know about NEURAX 2.0. Can't find your answer? Email us!"
                />

                <div className="faq-search" style={{ maxWidth: '600px', margin: '0 auto 40px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>🔍</div>
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '18px 24px 18px 56px',
                            borderRadius: '16px',
                            border: '1px solid var(--border-light)',
                            background: '#FFFFFF',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                            boxShadow: 'var(--shadow-sm)',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                        }}
                    />
                </div>

                <div className="faq-tabs" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                border: '1px solid var(--border-light)',
                                background: activeCategory === cat ? 'var(--accent-primary)' : '#FFFFFF',
                                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="faq-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '60px', background: '#FFFFFF', borderRadius: '24px', border: '1px solid var(--border-light)' }}>
                            No questions found. Try a different search term.
                        </div>
                    ) : (
                        filtered.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                style={{ marginBottom: '16px' }}
                            >
                                <div
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    style={{
                                        padding: '24px 32px',
                                        background: '#FFFFFF',
                                        borderRadius: openIndex === i ? '20px 20px 0 0' : '20px',
                                        border: '1px solid var(--border-light)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: openIndex === i ? 'none' : 'var(--shadow-sm)'
                                    }}
                                >
                                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{faq.question}</span>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        color: 'var(--accent-primary)',
                                        transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}>+</div>
                                </div>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{
                                                overflow: 'hidden',
                                                background: '#FFFFFF',
                                                borderRadius: '0 0 20px 20px',
                                                border: '1px solid var(--border-light)',
                                                borderTop: 'none'
                                            }}
                                        >
                                            <div style={{ padding: '0 32px 32px', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{faq.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>

                <motion.div
                    style={{ textAlign: 'center', marginTop: '64px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1rem' }}>
                        Still have questions? We're here to help!
                    </p>
                    <a href="mailto:neurax@cmrcet.ac.in" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        📧 Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
