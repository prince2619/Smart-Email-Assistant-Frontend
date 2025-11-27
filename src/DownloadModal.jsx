import { Modal, Box, Typography, Button } from "@mui/material";

export default function DownloadModal({ open, onClose }) {
  const extensionFileUrl = "/email-writer-ext.zip";

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-ui">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Install EmailAI Extension
        </Typography>

        <ol className="steps">
          <li>Download the extension file</li>
          <li>Extract the ZIP on your system</li>
          <li>Open Chrome → chrome://extensions</li>
          <li>Enable Developer Mode (top right)</li>
          <li>Click “Load unpacked”</li>
          <li>Select the extracted folder</li>
        </ol>

        <Button
          variant="contained"
          fullWidth
          href={extensionFileUrl}
          download
          sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
        >
          Download Extension
        </Button>
      </Box>
    </Modal>
  );
}
