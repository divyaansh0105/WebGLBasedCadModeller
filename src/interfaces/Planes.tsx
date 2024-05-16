import {Shape} from './Shape';

// Define planes with shapes as input

export interface Planes 
{
    [plane: string]: Shape[]; 
}