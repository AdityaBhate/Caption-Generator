"use client"

import { useEffect, useState, useRef } from 'react'
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL, fetchFile } from "@ffmpeg/util"
import SparklesIcon from "../components/SparklesIcon"
import { transcriptonItemToSrt } from "../libs/awsTranscriptionHelpers"
import roboto from "../fonts/Roboto-Regular.ttf"
import robotoBold from "../fonts/Roboto-Bold.ttf"

function ResultVideo({ filename, awsTranscriptionItems }) {
    const defaultVideoURL = `https://video-caption-generator.s3.ap-south-1.amazonaws.com/${filename}`
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);

    const [primaryColor, setPrimaryColor] = useState('#FFFFFF')
    const [outlineColor, setOutlineColor] = useState('#000000')
    const [FontSize, setFontSize] = useState(30)
    const [MarginV, setMarginV] = useState(70)
    const [progress, setProgress] = useState(1);

    useEffect(() => {
        videoRef.current.src = defaultVideoURL
        load();
    }, [])

    const load = async () => {
        console.log("Loading ffmpeg")
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
        console.log(loaded)
    }

    function toFFmpegColor(rgb) {
        const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
        return '&H' + bgr + '&';
    }

    const transcode = async () => {
        await load();
        if (FontSize < 10) value = 10;
        if (FontSize > 99) value = 99;
        if (MarginV < 10) value = 10;
        if (MarginV > 250) value = 250;
        const ffmpeg = ffmpegRef.current;
        const subtitles = transcriptonItemToSrt(awsTranscriptionItems)
        await ffmpeg.writeFile('subs.srt', subtitles);
        await ffmpeg.writeFile(filename, await fetchFile(defaultVideoURL));
        const duration = videoRef.current.duration;
        ffmpeg.on('log', ({ message }) => {
            const regexResult = /time=([0-9:.]+)/.exec(message);
            if (regexResult && regexResult?.[1]) {
                const howMuchIsDone = regexResult?.[1];
                const [hours, minutes, seconds] = howMuchIsDone.split(':');
                const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
                const videoProgress = doneTotalSeconds / duration;
                setProgress(videoProgress);
            }
        });
        await ffmpeg.exec([
            '-i', filename,
            '-preset', 'ultrafast',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=${FontSize},MarginV=${MarginV},PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)},Alignment=2,MarginL=10,MarginR=10'`,
            'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        setProgress(1);
    }

    return (
        <>
            <div className="mb-4">
                <button onClick={transcode} className="flex gap-1 border-2 border-purple-700/50 bg-green-600 rounded-full px-6 py-2 cursor-pointer">
                    <SparklesIcon /> Apply Captions
                </button>
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <div className="text-lg font-bold mb-2">Caption Settings</div>
                <div className='flex items-center gap-1 mb-1'>Primary Color: <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} /></div>
                <div className='flex items-center gap-1'>Outline Color: <input type="color" value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} /></div>
                <div className='flex items-center gap-1'>Font Size: (10-100)<input className='w-20 outline-none border-0 text-black p-1' type="number" value={FontSize} onChange={(e) => setFontSize(e.target.value)} /></div>
                <div className='flex items-center gap-1'>Margin Vertical: (10-250)<input className='w-20 outline-none border-0 text-black p-1' type="number" value={MarginV} onChange={(e) => setMarginV(e.target.value)} /></div>
            </div>
            <div className="rounded-lg overflow-hidden">
                {progress && progress < 1 && (
                    <div className="absolute inset-0 bg-black/80 flex items-center">
                        <div className="w-full text-center">
                            <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                                <div className="bg-bg-gradient-from h-8"
                                    style={{ width: progress * 100 + '%' }}>
                                    <h3 className="text-white text-xl absolute inset-0 py-1">
                                        {parseInt(progress * 100)}%
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <video ref={videoRef} controls></video>
            </div>

        </>
    )
}

export default ResultVideo