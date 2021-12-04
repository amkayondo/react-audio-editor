import React, { useState, useEffect, useContext, useRef } from 'react';
import { FileContext } from '../contexts/fileContext';
import wavesurfer from 'wavesurfer.js';

const AudioWaveform = () => {
	const wavesurferRef = useRef(null);

	// fetch file url from the context
	const { fileURL, setFileURL } = useContext(FileContext);

	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: '#waveform',
					scrollParent: true,
					autoCenter: true,
					cursorColor: 'violet',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#69207F',
					responsive: true,
				})
			);
		}
	}, [wavesurferRef, wavesurferObj]);

	// once the file URL is ready, load the file to produce the waveform
	useEffect(() => {
		if (fileURL && wavesurferObj) {
			wavesurferObj.load(fileURL);
		}
	}, [fileURL, wavesurferObj]);

	// once the waveform is ready, play the audio
	useEffect(() => {
		if (wavesurferObj) {
			wavesurferObj.on('ready', () => {
				wavesurferObj.play();
				wavesurferObj.enableDragSelection({});
			});
		}
	}, [wavesurferObj]);

	return (
		<section className='waveform-container'>
			<div ref={wavesurferRef} id='waveform' />
		</section>
	);
};

export default AudioWaveform;