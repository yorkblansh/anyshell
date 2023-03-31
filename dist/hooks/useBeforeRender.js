import { useEffect, useState } from 'react';
export const useBeforeRender = (effect, deps) => {
    const [isRun, setIsRun] = useState(false);
    if (!isRun) {
        effect();
        setIsRun(true);
    }
    useEffect(() => () => setIsRun(false), deps);
};
