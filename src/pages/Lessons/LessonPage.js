import React from 'react';

export const LessonPage = () => {
  const images = [
    "https://freedivingstore.b-cdn.net/_8011%D0%BC.jpg",
    "https://freedivingstore.b-cdn.net/_7437%D0%BC.jpg",
    "https://freedivingstore.b-cdn.net/_8434%D0%BC.jpg",
  ];

  return (
    <>
        <h1>Lesson 1</h1>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap', // чтобы адаптировалось под мобильные
                padding: '2rem',
            }}
            >
            {images.map((src, index) => (
                <img
                key={index}
                src={src}
                alt={`Freediving ${index + 1}`}
                loading="lazy"
                style={{
                    width: '350px',
                    maxWidth: '90%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.35)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
                }}
                />
            ))}
        </div>
        <h2>Video course</h2>
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
        }}
        >
        <div
            style={{
            position: 'relative',
            paddingTop: '56.25%', // соотношение 16:9
            width: '80%',
            maxWidth: '800px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
            border: '3px solid #e2e8f0', // рамка
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.35)';
            }}
            onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
            }}
        >
            <iframe
            src="https://player.mediadelivery.net/embed/512629/8d4f3377-26be-4130-b041-8aa87ae9b71c?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
            loading="lazy"
            style={{
                border: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '20px',
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Freediving Video"
            />
        </div>
        </div>
    </>
  );
};

export default LessonPage;
