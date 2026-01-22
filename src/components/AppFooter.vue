<template>
  <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 mt-12 pt-12 pb-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-10 justify-between items-start mb-12">
        <div class="max-w-sm">
          <div class="flex items-center gap-2 mb-4">
            <div class="bg-primary p-1.5 rounded-lg">
              <span class="material-icons text-white text-lg">support_agent</span>
            </div>
            <h5 class="font-bold text-slate-800 dark:text-white">中国公共服务热线大全</h5>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed mb-4">
            致力于提供尽可能全面、清晰的公共服务电话信息。号码可能变更，请以官方最新公布为准。
          </p>
          <div class="text-xs text-slate-400">
            <p>© 2025 中国公共服务热线大全. 保留所有权利。</p>
          </div>
        </div>

        <div class="flex-1 w-full md:w-auto">
          <div class="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border border-red-100 dark:border-red-900/30">
            <h5 class="text-danger text-sm font-bold flex items-center gap-2 mb-3">
              <span class="material-icons text-base">gavel</span>
              法律声明与免责条款
            </h5>
            <ul class="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
              <li class="flex gap-2 items-start">
                <span class="text-danger mt-0.5">•</span>
                <span>本平台提供的号码信息仅供参考，具体服务请以官方发布为准。</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-danger mt-0.5">•</span>
                <span><strong class="text-danger">严禁恶意拨打</strong>：报警、急救等紧急热线是公共资源，非紧急情况请勿占用。</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-danger mt-0.5">•</span>
                <span>如发现号码错误或失效，欢迎反馈，我们将尽快核实更新。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-100 dark:border-slate-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
        <div class="flex gap-6">
          <a class="hover:text-primary transition-colors" href="#">关于我们</a>
          <a class="hover:text-primary transition-colors" href="#">联系方式</a>
          <a class="hover:text-primary transition-colors" href="#">隐私政策</a>
          <a class="hover:text-primary transition-colors" href="#">用户协议</a>
        </div>
        <div class="flex gap-2 items-center">
          <span>京ICP备00000000号-1</span>
          <span class="w-px h-3 bg-slate-300"></span>
          <span>京公网安备 00000000000000号</span>
        </div>
      </div>
    </div>
  </footer>
</template>

