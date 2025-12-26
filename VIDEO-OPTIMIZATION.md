# Video Optimization Tips

## Current Video
- **File**: `src/assets/video.mp4`
- **Size**: 34.6 MB
- **Status**: Working in production build ✅

## Optimization Recommendations (Optional)

If you want to reduce the file size for faster loading:

### 1. Compress the video
```bash
# Using ffmpeg (install with: apt install ffmpeg)
ffmpeg -i video.mp4 -vcodec libx264 -crf 28 -preset slow video-compressed.mp4
```

### 2. Create multiple formats for better browser support
```bash
# WebM format (better compression)
ffmpeg -i video.mp4 -c:v libvpx-vp9 -b:v 1M video.webm

# Then update HeroSection.tsx:
<video ...>
  <source src={heroVideoWebm} type="video/webm" />
  <source src={heroVideo} type="video/mp4" />
</video>
```

### 3. Reduce resolution if too large
```bash
# Scale to 1080p (Full HD)
ffmpeg -i video.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 video-1080p.mp4

# Scale to 720p (HD) - smaller file
ffmpeg -i video.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 video-720p.mp4
```

### 4. Lazy load for mobile
Add this to HeroSection.tsx for better mobile performance:

```tsx
const [shouldLoadVideo, setShouldLoadVideo] = useState(
  window.innerWidth > 768
);

// Then in JSX:
{shouldLoadVideo ? (
  <video ... />
) : (
  <div className="bg-background" />
)}
```

## Current Implementation
✅ The video works perfectly as-is
✅ Auto-plays in loop
✅ Mobile compatible (playsInline)
✅ Muted for autoplay compliance
✅ Graceful fallback message

**Note**: Only optimize if loading speed becomes an issue.
