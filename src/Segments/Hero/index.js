import './hero.css';


// Hero Component
function Hero() {
    return (
        <div className='hero-div'>
            <div className='hero-inner-div'>
                <p className='h1-white'>Test assignment for front-end developer</p>
                <p className='p-white'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <a href="#signup"><button type='button' className='primary-button mt-20'>Sign up</button></a>
            </div>
        </div>
    )
}

export default Hero;