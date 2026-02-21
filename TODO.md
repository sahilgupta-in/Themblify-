# Fix Generate.tsx bugs

## TODO List:
- [x] 1. Fix API URL in Generate.tsx - change `/api/user/thumbnail/$/{id}` to `/api/thumbnail/${id}`
- [x] 2. Add getThumbnailById controller function in ThumbnailController.ts
- [x] 3. Add route for getting single thumbnail in ThumbnailRoutes.ts
- [x] 4. Fix aspect_ratio parameter name mismatch in client (send aspectRatio instead)
