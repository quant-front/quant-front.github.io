### ~Three.js start template
**Start project**  - npm run watch  
**Start Shader project** - npm run shader  

**GLTF Compressor** -  https://github.com/CesiumGS/gltf-pipeline
```javascript
save save textures and position
gltf-pipeline -i model.gltf -t
gltf-pipeline -i woman.gltf -o model.glb --draco.compressionLevel=10
```
