// src/ModelViewer.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelViewer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        // Load model
        const loader = new GLTFLoader();
        loader.load('/models/untitled_1.glb', (gltf) => {
            const model = gltf.scene;

            // Set model position, rotation, and scale
            model.position.set(0, -3, 0);
            model.scale.set(3, 3, 3);
            scene.add(model);

            // Cursor interaction logic
            document.addEventListener('mousemove', (event) => {
                const targetRotationX = (event.clientY / window.innerHeight) * Math.PI / 9;
                const targetRotationY = (event.clientX / window.innerWidth) * Math.PI / 9;
                model.rotation.x = targetRotationX;
                model.rotation.y = targetRotationY;
            });
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on component unmount
        return () => {
            renderer.dispose();
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ModelViewer;
