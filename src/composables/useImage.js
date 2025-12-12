export const useImage = () => {
    const getImageUrl = (image) => {
        if (!image || !image.path) return '';
        const baseUrl = import.meta.env.VITE_FILE_BASE_URL || '';
        return `${baseUrl}/${image.path}`;
    };

    return {
        getImageUrl
    };
};

export const useImages = () => {
    const getImagesUrl = (images) => {
        if (!images || !images.length) return [];
        const baseUrl = import.meta.env.VITE_FILE_BASE_URL || '';
        return images.map(image => `${baseUrl}/${image.path}`);
    };

    return {
        getImagesUrl
    };
};
