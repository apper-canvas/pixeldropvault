import { toast } from "react-toastify";

const uploadService = {
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
          {"field": {"Name": "share_link_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "expires_at_c"}},
          {"field": {"Name": "Tags_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('upload_c', params);
      
      if (!response.success) {
        console.error("Error fetching uploads:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching uploads:", error?.response?.data?.message || error);
      toast.error("Failed to fetch uploads");
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
          {"field": {"Name": "share_link_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "expires_at_c"}},
          {"field": {"Name": "Tags_c"}}
        ]
      };

      const response = await apperClient.getRecordById('upload_c', parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching upload:", response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching upload ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(uploadData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const createData = {
        Name: uploadData.Name || "File Upload",
        share_link_c: uploadData.share_link_c || `https://dropvault.com/share/${Math.random().toString(36).substring(2, 15)}`,
        total_size_c: uploadData.total_size_c || 0,
        files_c: JSON.stringify(uploadData.files_c || []),
        created_at_c: new Date().toISOString(),
        expires_at_c: uploadData.expires_at_c || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        Tags_c: uploadData.Tags_c || ""
      };

      const params = {
        records: [createData]
      };

      const response = await apperClient.createRecord('upload_c', params);
      
      if (!response.success) {
        console.error("Error creating upload:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} upload records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Upload created successfully!");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating upload:", error?.response?.data?.message || error);
      toast.error("Failed to create upload");
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
        ...(updates.share_link_c && { share_link_c: updates.share_link_c }),
        ...(updates.total_size_c !== undefined && { total_size_c: updates.total_size_c }),
        ...(updates.files_c && { files_c: JSON.stringify(updates.files_c) }),
        ...(updates.expires_at_c && { expires_at_c: updates.expires_at_c }),
        ...(updates.Tags_c !== undefined && { Tags_c: updates.Tags_c })
      };

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('upload_c', params);
      
      if (!response.success) {
        console.error("Error updating upload:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} upload records:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Upload updated successfully!");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating upload:", error?.response?.data?.message || error);
      toast.error("Failed to update upload");
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

      const response = await apperClient.deleteRecord('upload_c', params);
      
      if (!response.success) {
        console.error("Error deleting upload:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} upload records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Upload deleted successfully!");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting upload:", error?.response?.data?.message || error);
      toast.error("Failed to delete upload");
      return false;
    }
  },

  async getRecent(limit = 10) {
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
          {"field": {"Name": "share_link_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "expires_at_c"}},
          {"field": {"Name": "Tags_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      };

      const response = await apperClient.fetchRecords('upload_c', params);
      
      if (!response.success) {
        console.error("Error fetching recent uploads:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching recent uploads:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByShareLink(shareLink) {
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
          {"field": {"Name": "share_link_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "files_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "expires_at_c"}},
          {"field": {"Name": "Tags_c"}}
        ],
        where: [{"FieldName": "share_link_c", "Operator": "ExactMatch", "Values": [shareLink]}],
        pagingInfo: {"limit": 1, "offset": 0}
      };

      const response = await apperClient.fetchRecords('upload_c', params);
      
      if (!response.success) {
        console.error("Error fetching upload by share link:", response.message);
        return null;
      }

      const data = response.data || [];
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Error fetching upload by share link:", error?.response?.data?.message || error);
      return null;
    }
  }
};

export default uploadService;