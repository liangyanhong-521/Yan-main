<template>
  <div class="upload-wrapper">
    <input
      id="files"
      class="file-upload"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="updateValue()"
    />
    <slot></slot>
    <div class="upload-tips">
      <slot name="tips"></slot>
    </div>
    <ol class="upload-filesInfo" v-for="(item, index) in fileList" :key="index">
      <li class="fileInfo">{{ item.name }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "YUpload",
  mounted() {
    // console.log(this.accept);
    // console.log(this.multiple);
  },
  props: {
    accept: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    name: {
      type: String,
      default: "file",
    },
    sizeLimit: {
      type: Number,
      default: 1024 * 1024,
    },
    method: {
      type: String,
      default: "POST",
    },
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue() {
      var f = document.getElementById("files");
      console.log(f.files);
      this.uploadFile(f.files);
    },
    beforeUploadFile(files, newNames) {
      files = Array.from(files); //作用将对象转换为数组的形式。
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let { size, type } = file;
        if (size > this.sizeLimit) {
          console.log("文件太大了");
          return false;
        }
        if (this.accept) {
          if (type != this.accept) {
            console.log("文件的格式有错误");
            return false;
          }
        }
      }
      let newfilesList = files.map((item, i) => {
        let { size, type } = item;
        return { name: newNames[i], type, size, status: "uploading" };
      });
      // [...this.fileList, ...newfilesList]作用是合并数组
      this.$emit("update:fileList", [...this.fileList, ...newfilesList]);
      return true;
    },
    uploadFile(files) {
      let newNames = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let { name, size, type } = file;
        newNames[i] = name;
      }
      if (!this.beforeUploadFile(files, newNames)) {
        return;
      }
      // 开始启动上传功能
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        var formData = new FormData();
        formData.append(this.name, file);
        this.ajax(formData, this.method, this.action);
      }
    },
    afterUploadFile(newName, url) {},
    uploadError(xhr, newName) {},
    ajax(formData, method, url) {
      const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 前端设置是否带cookie
        xhr.withCredentials = true;
        xhr.open(method, url);
        xhr.setRequestHeader(
          "Content-Type","application/x-www-form-urlencoded;charset=UTF-8"
        );
        xhr.send(formData);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
              // resolve调用成功的回调函数
            } else {
              reject(xhr.status);
              // reject调用失败的回调函数
            }
          }
        };
      });
      p.then(
        // then 默认的两个参数第一个为成功的回调，第二个失败的回调
        function (value) {
          console.log(value);
          const res = JSON.parse(value);
          console.log(res);
        },
        function (reason) {
          console.log(reason);
          console.error(reason);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-wrapper {
}
.file-upload {
  position: absolute;
  display: block;
  width: 100px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
}
.upload-tips {
  font-size: 13px;
  color: rgb(146, 144, 144);
}
</style>