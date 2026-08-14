// Declaracoes de modulos de asset (antes vinham de vite/client)
declare module '*.css';
declare module '*.svg' {
    const url: string;
    export default url;
}
