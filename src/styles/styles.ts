import ReactQuill from "react-quill";

export const Color = {
    headingGradientLg: 'linear-gradient(to left, #ffffff 0%, #1fa4ab 50%, #ffffff 100%)',
    headingGradientMd: 'linear-gradient(to right, #1fa4ab, #ffffff)',
    blue_100: '#f1f7ff',
    greenBlue: '#1fa4ab',
    hoverBlue: '#144a91',
    hoverGreenBlue: '#1fa4abc7',
};

export const Border = {
    tableBorder: '1px solid #8080808f'
};

export const Shadow = {
    cardShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
    cardShadowBottom: '0 3px 3px -3px rgba(0, 0, 0, 0.2)',
};

const sizes = ['8px', '10px', '12px', '14px', '16px', '18px', '24px', '36px', '48px'];
const Size = ReactQuill.Quill.import('attributors/style/size');
Size.whitelist = sizes;
ReactQuill.Quill.register(Size, true);

export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: sizes }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link']
    ]
}