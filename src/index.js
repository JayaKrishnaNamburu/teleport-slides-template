import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import * as files from './slides'
import styles from './styles.module.css'

const slides = Object.keys(files)

const RenderSlide = ({ component }) => component()

const App = () => {
	const [slide, setSlide] = useState(1)
	const progress = (slide/slides.length)*100

	const handleKeyDown = (e) => {
		e.preventDefault();
		if (e.key === 'ArrowRight' && slide < slides.length ) {
			setSlide(slide + 1)
		}
		
		if (e.key === 'ArrowLeft' && (slide > 1 && slide <= slides.length)) {
			setSlide(slide - 1)
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [slide])
	
	return (
		<Fragment>
			<RenderSlide component={files[slides[slide - 1]]}/>
			<div className={styles.slider}>
				<span className={styles.progress} style={{ width: `${progress}%`}}></span>
			</div>
		</Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))