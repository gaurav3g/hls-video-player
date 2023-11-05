export const init_state = {
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    playing: false,
    isReady: false,
    duration: 0,
    playedSeconds: 0,
    error: '',
}

export const buffer_marks = [
    {
        value: 0,
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    },
];