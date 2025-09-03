import { toast } from "react-toastify";

const fileService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id_c"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "thumbnail_url_c"}},
          {"field": {"Name": "url_c"}},
          {"field": {"Name": "Tags_c"}}
        ],
        orderBy: [{"fieldName": "uploaded_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('file_c', params);
      
      if (!response.success) {
        console.error("Error fetching files:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching files:", error?.response?.data?.message || error);
      toast.error("Failed to fetch files");
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id_c"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "thumbnail_url_c"}},
          {"field": {"Name": "url_c"}},
          {"field": {"Name": "Tags_c"}}
        ]
      };

      const response = await apperClient.getRecordById('file_c', parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching file:", response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching file ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(fileData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const createData = {
        Name: fileData.Name || fileData.name_c || "Untitled File",
        name_c: fileData.name_c || fileData.name || "Untitled File",
        size_c: fileData.size_c || fileData.size || 0,
        type_c: fileData.type_c || fileData.type || "application/octet-stream",
        status_c: "uploading",
        progress_c: 0,
        uploaded_at_c: new Date().toISOString(),
        thumbnail_url_c: fileData.thumbnail_url_c || fileData.thumbnailUrl || null,
        url_c: null,
        Tags_c: fileData.Tags_c || ""
      };

      const params = {
        records: [createData]
      };

      const response = await apperClient.createRecord('file_c', params);
      
      if (!response.success) {
        console.error("Error creating file:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} file records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating file:", error?.response?.data?.message || error);
      toast.error("Failed to create file");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const updateData = {
        Id_c: parseInt(id),
        ...(updates.Name && { Name: updates.Name }),
        ...(updates.name_c && { name_c: updates.name_c }),
        ...(updates.size_c !== undefined && { size_c: updates.size_c }),
        ...(updates.type_c && { type_c: updates.type_c }),
        ...(updates.status_c && { status_c: updates.status_c }),
        ...(updates.progress_c !== undefined && { progress_c: updates.progress_c }),
        ...(updates.thumbnail_url_c !== undefined && { thumbnail_url_c: updates.thumbnail_url_c }),
        ...(updates.url_c !== undefined && { url_c: updates.url_c }),
        ...(updates.Tags_c !== undefined && { Tags_c: updates.Tags_c })
      };

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('file_c', params);
      
      if (!response.success) {
        console.error("Error updating file:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} file records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating file:", error?.response?.data?.message || error);
      toast.error("Failed to update file");
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('file_c', params);
      
      if (!response.success) {
        console.error("Error deleting file:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} file records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting file:", error?.response?.data?.message || error);
      toast.error("Failed to delete file");
      return false;
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id_c"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "thumbnail_url_c"}},
          {"field": {"Name": "url_c"}},
          {"field": {"Name": "Tags_c"}}
        ],
        where: [{"FieldName": "status_c", "Operator": "ExactMatch", "Values": [status]}],
        orderBy: [{"fieldName": "uploaded_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('file_c', params);
      
      if (!response.success) {
        console.error("Error fetching files by status:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching files by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  async updateProgress(id, progress) {
    try {
      const progressValue = Math.min(progress, 100);
      const updates = {
        progress_c: progressValue
      };

      // Mark as completed when progress reaches 100
      if (progressValue >= 100) {
        updates.status_c = "completed";
        updates.url_c = `https://dropvault.com/files/${id}/${encodeURIComponent(Date.now())}`;
      }

      return await this.update(id, updates);
    } catch (error) {
      console.error("Error updating file progress:", error);
      return null;
    }
  }
};

export default fileService;